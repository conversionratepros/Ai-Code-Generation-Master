#!/usr/bin/env python3
"""
figma-spec.py — dump exact typography/layout ground truth from the Figma REST API.

The Figma MCP's get_design_context GENERATES code (values can drift); this reads
the raw node data, so every font-family/weight/size/line-height/padding/gap is
exactly what the designer set.

Usage:
  python3 tools/figma-spec.py "<figma url with node-id>" [--out spec.md]
  python3 tools/figma-spec.py FILE_KEY NODE_ID [NODE_ID...] [--out spec.md]

Token resolution order: --token, $FIGMA_TOKEN, ~/.figma_token
Token scope needed: File content (read-only).
"""

import argparse
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

API = "https://api.figma.com/v1"


def get_token(cli_token):
    if cli_token:
        return cli_token.strip()
    if os.environ.get("FIGMA_TOKEN"):
        return os.environ["FIGMA_TOKEN"].strip()
    tf = Path.home() / ".figma_token"
    if tf.exists():
        return tf.read_text().strip()
    sys.exit("No Figma token. Pass --token, set $FIGMA_TOKEN, or write ~/.figma_token")


def parse_url(url):
    """Extract (file_key, node_id) from a figma.com design/file URL."""
    m = re.search(r"figma\.com/(?:design|file)/([A-Za-z0-9]+)", url)
    if not m:
        return None, None
    key = m.group(1)
    q = urllib.parse.parse_qs(urllib.parse.urlparse(url).query)
    node = q.get("node-id", [None])[0]
    return key, node


def api_get(path, token):
    req = urllib.request.Request(API + path, headers={"X-Figma-Token": token})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())


def hex_of(color, opacity=None):
    r, g, b = (round(color.get(c, 0) * 255) for c in ("r", "g", "b"))
    a = color.get("a", 1)
    if opacity is not None:
        a *= opacity
    h = f"#{r:02X}{g:02X}{b:02X}"
    return h if a >= 0.999 else f"{h} @{round(a * 100)}%"


def fill_desc(node):
    """Describe the first visible fill of a node."""
    for f in node.get("fills") or []:
        if f.get("visible") is False:
            continue
        t = f.get("type")
        if t == "SOLID":
            return hex_of(f["color"], f.get("opacity"))
        if t and t.startswith("GRADIENT"):
            stops = ", ".join(hex_of(s["color"]) for s in f.get("gradientStops", []))
            return f"{t.lower().replace('_', ' ')} [{stops}]"
        if t == "IMAGE":
            return "image fill"
    return None


def stroke_desc(node):
    for s in node.get("strokes") or []:
        if s.get("visible") is False or s.get("type") != "SOLID":
            continue
        w = node.get("strokeWeight")
        return f"{hex_of(s['color'], s.get('opacity'))} {w}px"
    return None


def line_height(style):
    unit = style.get("lineHeightUnit")
    px = style.get("lineHeightPx")
    if unit == "INTRINSIC_%" or px is None:
        return "auto"
    return f"{round(px, 1)}px"


def type_desc(style):
    fam = style.get("fontFamily", "?")
    ps = style.get("fontPostScriptName") or ""
    w = style.get("fontWeight", "?")
    size = style.get("fontSize", "?")
    lh = line_height(style)
    ls = style.get("letterSpacing", 0)
    parts = [f"{fam} {w}", f"{size}px/{lh}"]
    if ps and ps.replace("-", " ").lower() != f"{fam} ".lower() + str(w):
        parts[0] = f"{fam} {w} ({ps})"
    if ls:
        parts.append(f"ls {round(ls, 2)}px")
    tc = style.get("textCase")
    if tc and tc != "ORIGINAL":
        parts.append(tc.lower())
    return " · ".join(str(p) for p in parts)


def text_overrides(node):
    """Inline style runs (e.g. one bold/coloured word inside a heading)."""
    table = node.get("styleOverrideTable") or {}
    chars = node.get("characters", "")
    codes = node.get("characterStyleOverrides") or []
    runs = []
    if not table or not codes:
        return runs
    i = 0
    while i < len(codes):
        code = codes[i]
        j = i
        while j < len(codes) and codes[j] == code:
            j += 1
        if code and str(code) in table:
            ov = table[str(code)]
            snippet = chars[i:j].strip()
            if snippet:
                bits = []
                if "fontWeight" in ov or "fontFamily" in ov or "fontSize" in ov:
                    merged = {**node.get("style", {}), **ov}
                    bits.append(type_desc(merged))
                if ov.get("fills"):
                    c = fill_desc({"fills": ov["fills"]})
                    if c:
                        bits.append(c)
                if bits:
                    runs.append(f'"{snippet[:40]}" → {"; ".join(bits)}')
        i = j
    return runs


def corner_desc(node):
    if node.get("rectangleCornerRadii"):
        radii = node["rectangleCornerRadii"]
        if len(set(radii)) > 1:
            return "r " + "/".join(str(round(r)) for r in radii)
    if node.get("cornerRadius"):
        return f"r {round(node['cornerRadius'])}"
    return None


def pad_desc(node):
    t, r, b, l = (round(node.get(k, 0)) for k in
                  ("paddingTop", "paddingRight", "paddingBottom", "paddingLeft"))
    if not any((t, r, b, l)):
        return None
    if t == b and r == l:
        return f"pad {t}/{r}" if t != r else f"pad {t}"
    return f"pad {t} {r} {b} {l}"


SKIP_TYPES = {"VECTOR", "BOOLEAN_OPERATION", "STAR", "LINE", "ELLIPSE",
              "REGULAR_POLYGON", "SLICE"}


def walk(node, depth, out, ramp, palette, max_depth):
    t = node.get("type")
    name = node.get("name", "")
    ind = "  " * depth
    bb = node.get("absoluteBoundingBox") or {}
    size = f"{round(bb.get('width', 0))}×{round(bb.get('height', 0))}"

    if t == "TEXT":
        style = node.get("style", {})
        chars = (node.get("characters") or "").replace("\n", " ")
        snippet = chars[:60] + ("…" if len(chars) > 60 else "")
        color = fill_desc(node)
        key = (style.get("fontFamily"), style.get("fontWeight"),
               style.get("fontSize"), line_height(style))
        ramp[key] += 1
        if color and "@" not in color and color.startswith("#"):
            palette[color] += 1
        out.append(f'{ind}- **"{snippet}"** — {type_desc(style)}'
                   + (f" · {color}" if color else ""))
        for run in text_overrides(node):
            out.append(f"{ind}  - override: {run}")
        return

    if t in SKIP_TYPES:
        return

    if t == "RECTANGLE":
        f = fill_desc(node)
        if f == "image fill":
            out.append(f"{ind}- [image] {name} ({size})")
        return

    # containers
    bits = [size]
    if node.get("layoutMode") and node["layoutMode"] != "NONE":
        dir_ = "row" if node["layoutMode"] == "HORIZONTAL" else "col"
        bits.append(dir_)
        gap = node.get("itemSpacing")
        if gap:
            bits.append(f"gap {round(gap)}")
        p = pad_desc(node)
        if p:
            bits.append(p)
    c = corner_desc(node)
    if c:
        bits.append(c)
    f = fill_desc(node)
    if f:
        bits.append(f"bg {f}")
        if f.startswith("#") and "@" not in f:
            palette[f] += 1
    s = stroke_desc(node)
    if s:
        bits.append(f"border {s}")
    for e in node.get("effects") or []:
        if e.get("visible") is not False and e.get("type") == "DROP_SHADOW":
            o = e.get("offset", {})
            bits.append(f"shadow {round(o.get('x',0))} {round(o.get('y',0))} "
                        f"{round(e.get('radius',0))} {hex_of(e['color'])}")

    label = f"{name}" if name else t.lower()
    out.append(f"{ind}- {label} [{', '.join(bits)}]")

    if max_depth and depth >= max_depth:
        n_children = len(node.get("children") or [])
        if n_children:
            out.append(f"{ind}  … {n_children} children (depth limit)")
        return
    for ch in node.get("children") or []:
        if ch.get("visible") is False:
            continue
        walk(ch, depth + 1, out, ramp, palette, max_depth)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("target", nargs="+",
                    help="Figma URL, or FILE_KEY followed by NODE_IDs")
    ap.add_argument("--token")
    ap.add_argument("--out", help="write markdown here instead of stdout")
    ap.add_argument("--max-depth", type=int, default=0,
                    help="limit tree depth (0 = unlimited)")
    args = ap.parse_args()

    token = get_token(args.token)

    if args.target[0].startswith("http"):
        key, node = parse_url(args.target[0])
        if not key or not node:
            sys.exit("Could not parse file key / node-id from URL")
        node_ids = [node.replace("-", ":")]
    else:
        key = args.target[0]
        if len(args.target) < 2:
            sys.exit("Need at least one NODE_ID after FILE_KEY")
        node_ids = [n.replace("-", ":") for n in args.target[1:]]

    data = api_get(f"/files/{key}/nodes?ids={','.join(node_ids)}", token)
    if data.get("err"):
        sys.exit(f"Figma API error: {data['err']}")

    lines = [f"# Figma spec — {data.get('name', key)}", ""]
    ramp, palette = Counter(), Counter()
    body = []
    for nid in node_ids:
        doc = (data.get("nodes") or {}).get(nid, {}).get("document")
        if not doc:
            body.append(f"## {nid} — NOT FOUND (check node id / file access)")
            continue
        body.append(f"## {doc.get('name', nid)} (`{nid}`)")
        body.append("")
        walk(doc, 0, body, ramp, palette, args.max_depth)
        body.append("")

    lines.append("## Type ramp (exact values, deduped)")
    lines.append("")
    lines.append("| Family | Weight | Size | Line height | Uses |")
    lines.append("|---|---|---|---|---|")
    for (fam, w, size, lh), n in sorted(ramp.items(),
                                        key=lambda kv: (-(kv[0][2] or 0))):
        lines.append(f"| {fam} | {w} | {size}px | {lh} | {n} |")
    lines.append("")
    lines.append("## Colour palette (solid fills, deduped)")
    lines.append("")
    for hexv, n in palette.most_common():
        lines.append(f"- `{hexv}` × {n}")
    lines.append("")
    lines += body

    md = "\n".join(lines)
    if args.out:
        Path(args.out).write_text(md)
        print(f"Wrote {args.out} ({len(md)} chars, "
              f"{len(ramp)} type styles, {len(palette)} colours)")
    else:
        print(md)


if __name__ == "__main__":
    main()

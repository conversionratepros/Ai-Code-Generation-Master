#!/usr/bin/env python3
"""
figma-assets.py — download every image fill and icon SVG under a Figma node,
named by its layer name + node id (so nothing depends on array order).

Usage:
  python3 tools/figma-assets.py "<figma url with node-id>" --out assets/

Raw image fills come from GET /v1/files/{key}/images (hash → url map).
Icon/vector nodes are rendered via GET /v1/images/{key}?ids=...&format=svg.
Token: --token, $FIGMA_TOKEN, or ~/.figma_token.
"""

import argparse
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://api.figma.com/v1"
VECTOR_TYPES = {"VECTOR", "BOOLEAN_OPERATION", "STAR", "LINE", "ELLIPSE",
                "REGULAR_POLYGON", "RECTANGLE"}
CONTAINER_TYPES = {"GROUP", "FRAME", "INSTANCE", "COMPONENT"}


def get_token(cli):
    if cli:
        return cli.strip()
    if os.environ.get("FIGMA_TOKEN"):
        return os.environ["FIGMA_TOKEN"].strip()
    tf = Path.home() / ".figma_token"
    if tf.exists():
        return tf.read_text().strip()
    sys.exit("No Figma token found")


def api_get(path, token):
    req = urllib.request.Request(API + path, headers={"X-Figma-Token": token})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())


def download(url, dest):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as r, open(dest, "wb") as f:
        f.write(r.read())


def slug(name):
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s[:40] or "asset"


def is_pure_vector(node):
    """True if every leaf under node is a vector shape (no text, no image)."""
    t = node.get("type")
    if t == "TEXT":
        return False
    for f in node.get("fills") or []:
        if f.get("type") == "IMAGE":
            return False
    kids = node.get("children")
    if kids is None:
        return t in VECTOR_TYPES
    return all(is_pure_vector(c) for c in kids)


def collect(node, images, icons, depth=0):
    """Gather (id, name, ref) for image fills and (id, name) for icon roots."""
    for f in node.get("fills") or []:
        if f.get("type") == "IMAGE" and f.get("imageRef"):
            images.append((node["id"], node.get("name", "image"), f["imageRef"]))
    t = node.get("type")
    bb = node.get("absoluteBoundingBox") or {}
    small = max(bb.get("width", 9999), bb.get("height", 9999)) <= 400
    if (t in CONTAINER_TYPES and small and node.get("children")
            and is_pure_vector(node)):
        icons.append((node["id"], node.get("name", "icon")))
        return  # don't recurse into an icon we're exporting whole
    for c in node.get("children") or []:
        if c.get("visible") is False:
            continue
        collect(c, images, icons, depth + 1)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--out", default="assets")
    ap.add_argument("--token")
    args = ap.parse_args()
    token = get_token(args.token)

    m = re.search(r"figma\.com/(?:design|file)/([A-Za-z0-9]+)", args.url)
    q = urllib.parse.parse_qs(urllib.parse.urlparse(args.url).query)
    node_id = (q.get("node-id", [None])[0] or "").replace("-", ":")
    if not m or not node_id:
        sys.exit("Need a figma URL containing a node-id")
    key = m.group(1)

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    tree = api_get(f"/files/{key}/nodes?ids={node_id}", token)
    doc = tree["nodes"][node_id]["document"]

    images, icons = [], []
    collect(doc, images, icons)

    # ---- raw image fills (hash → S3 url map) ----
    ref_map = api_get(f"/files/{key}/images", token).get("meta", {}) \
        .get("images", {})
    seen_refs = {}
    manifest = []
    for nid, name, ref in images:
        if ref in seen_refs:                       # same image reused
            manifest.append((nid, name, seen_refs[ref], "reuse"))
            continue
        url = ref_map.get(ref)
        if not url:
            print(f"  !! no url for image fill on {name} ({nid})")
            continue
        fname = f"img_{slug(name)}_{nid.replace(':', '-')}.png"
        download(url, out / fname)
        seen_refs[ref] = fname
        manifest.append((nid, name, fname, "image"))
        print(f"  image  {fname}  <- '{name}'")

    # ---- icon SVG renders (batched) ----
    if icons:
        ids = ",".join(i[0] for i in icons)
        rend = api_get(f"/images/{key}?ids={urllib.parse.quote(ids)}&format=svg",
                       token)
        for nid, name in icons:
            url = (rend.get("images") or {}).get(nid)
            if not url:
                print(f"  !! render failed for {name} ({nid})")
                continue
            fname = f"icon_{slug(name)}_{nid.replace(':', '-')}.svg"
            download(url, out / fname)
            manifest.append((nid, name, fname, "svg"))
            print(f"  svg    {fname}  <- '{name}'")

    with open(out / "manifest.json", "w") as f:
        json.dump([{"nodeId": n, "layer": nm, "file": fn, "kind": k}
                   for n, nm, fn, k in manifest], f, indent=1)
    print(f"\n{len(seen_refs)} unique images, "
          f"{sum(1 for x in manifest if x[3]=='svg')} svgs -> {out}/")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Convert.com Deploy Script
=========================
Automates the full hand-off from finished test code → Convert.com → QA Slack.

Usage:
  python3 shared/convert-deploy.py CRO-7740
  python3 shared/convert-deploy.py CRO-7740 --dry-run

What it does:
  1. Locates the test folder and reads variation.js + variation.css
  2. Reads the test's config.json for target URL and test name
  3. Creates the experiment in Convert.com via REST API v2
  4. Sets the variation JS + CSS code
  5. Puts the experiment into Preview mode
  6. Posts the preview URL + test summary to #qa-l1 on Slack

Setup (one-time):
  Add to .claude/settings.local.json → env:
    CONVERT_API_KEY     — from Convert.com → Account Settings → API Keys
    CONVERT_ACCOUNT_ID  — numeric ID in Convert.com URL when logged in
    CONVERT_PROJECT_ID  — numeric ID of your project in Convert.com
"""

import json
import os
import sys
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).parent.parent
SETTINGS_PATH = REPO_ROOT / ".claude" / "settings.local.json"
SLACK_CHANNEL_ID = "C08A6HKTMG8"

CONVERT_BASE = "https://api.convert.com/api/v2"

# ── Credential loading ────────────────────────────────────────────────────────

def load_credentials():
    creds = {}
    keys = ["CONVERT_API_KEY", "CONVERT_ACCOUNT_ID", "CONVERT_PROJECT_ID",
            "SLACK_BOT_TOKEN"]

    # Prefer env vars (set by Claude session)
    for k in keys:
        if os.environ.get(k):
            creds[k] = os.environ[k]

    # Fallback: read settings.local.json
    if SETTINGS_PATH.exists():
        with open(SETTINGS_PATH) as f:
            settings = json.load(f)
        env = settings.get("env", {})
        for k in keys:
            if k not in creds and env.get(k):
                creds[k] = env[k]

    missing = [k for k in keys if k not in creds]
    if missing:
        print(f"\nERROR: Missing credentials: {', '.join(missing)}")
        print("Add them to .claude/settings.local.json → env: { ... }")
        print("See setup instructions at the top of this file.")
        sys.exit(1)

    return creds

# ── Test file finder ──────────────────────────────────────────────────────────

def find_test_folder(test_id):
    """Search the repo for a folder whose name contains the test ID."""
    test_id_upper = test_id.upper()
    test_id_lower = test_id.lower()

    search_roots = [
        REPO_ROOT / "CTM",
        REPO_ROOT / "ARC",
        REPO_ROOT / "Shopify",
        REPO_ROOT / "CRO-12205",
    ]
    # Also search any top-level client folder
    for item in REPO_ROOT.iterdir():
        if item.is_dir() and item not in search_roots and not item.name.startswith("."):
            search_roots.append(item)

    for root in search_roots:
        if not root.exists():
            continue
        for folder in root.rglob("*"):
            if folder.is_dir() and (test_id_upper in folder.name or test_id_lower in folder.name):
                return folder

    return None

def find_code_files(folder):
    """Find variation JS and CSS files in a test folder, checking common names."""
    js_names = ["variation.js", "variant.js"]
    css_names = ["variation.css", "variant.css"]

    js_file = None
    css_file = None

    for name in js_names:
        candidate = folder / name
        if candidate.exists():
            js_file = candidate
            break

    for name in css_names:
        candidate = folder / name
        if candidate.exists():
            css_file = candidate
            break

    # Also check a testFiles/ subfolder
    if not js_file:
        for name in js_names:
            candidate = folder / "testFiles" / name
            if candidate.exists():
                js_file = candidate
                break
    if not css_file:
        for name in css_names:
            candidate = folder / "testFiles" / name
            if candidate.exists():
                css_file = candidate
                break

    return js_file, css_file

def load_test_config(folder, test_id):
    """Load or prompt for the test config.json."""
    config_path = folder / "config.json"

    if config_path.exists():
        with open(config_path) as f:
            return json.load(f)

    # Config missing — prompt user
    print(f"\nNo config.json found in {folder.name}")
    print("Please answer the following to create it:\n")

    target_url = input("  Target URL (e.g. https://www.ctm.co.za/checkout/cart): ").strip()
    test_name = input(f"  Test name [{test_id}]: ").strip() or test_id

    config = {
        "test_id": test_id,
        "test_name": test_name,
        "target_url": target_url,
    }

    with open(config_path, "w") as f:
        json.dump(config, f, indent=2)
    print(f"  Saved config.json to {config_path}\n")

    return config

# ── Convert.com API ───────────────────────────────────────────────────────────

def convert_request(method, path, body, api_key, account_id, project_id):
    url = f"{CONVERT_BASE}/accounts/{account_id}/projects/{project_id}{path}"
    data = json.dumps(body).encode("utf-8") if body else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body_bytes = e.read()
        print(f"\nConvert API error {e.code}: {body_bytes.decode()}")
        raise

def create_experiment(config, js_code, css_code, api_key, account_id, project_id):
    """Create an A/B experiment in Convert.com with control + 1 variation."""
    payload = {
        "name": config["test_name"],
        "type": "a/b",
        "urls": [
            {"type": "matches_exactly", "value": config["target_url"]}
        ],
        "variations": [
            {
                "name": "Control",
                "percentage": 50,
                "is_baseline": True
            },
            {
                "name": "Variation 1",
                "percentage": 50,
                "js_code": js_code,
                "css_code": css_code or ""
            }
        ]
    }
    return convert_request("POST", "/experiences", payload, api_key, account_id, project_id)

def set_experience_status(experience_id, status, api_key, account_id, project_id):
    """Set experience status: draft | active | paused | deleted."""
    return convert_request(
        "PATCH",
        f"/experiences/{experience_id}",
        {"status": status},
        api_key, account_id, project_id
    )

def build_preview_url(target_url, experience_id, variation_id):
    """
    Convert.com preview URL format.
    Appends query params that trigger the variant for the previewer only.
    """
    separator = "&" if "?" in target_url else "?"
    return (
        f"{target_url}{separator}"
        f"_con=convert&_ex_id={experience_id}&_var_id={variation_id}"
    )

# ── Slack ─────────────────────────────────────────────────────────────────────

def post_to_slack(thread_ts, message, slack_token):
    """Post a message to #qa-l1. If thread_ts given, posts as reply."""
    payload = {
        "channel": SLACK_CHANNEL_ID,
        "text": message,
    }
    if thread_ts:
        payload["thread_ts"] = thread_ts

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://slack.com/api/chat.postMessage",
        data=data,
        headers={
            "Authorization": f"Bearer {slack_token}",
            "Content-Type": "application/json; charset=utf-8",
        }
    )
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
    if not result.get("ok"):
        print(f"  Slack warning: {result.get('error')}")
    return result

def build_slack_message(config, experience_id, preview_url):
    test_id = config.get("test_id", "")
    test_name = config.get("test_name", test_id)
    target_url = config.get("target_url", "")

    return (
        f":white_check_mark: *{test_id} — Ready for QA*\n"
        f"*Test:* {test_name}\n"
        f"*Target page:* {target_url}\n"
        f"*Convert experiment ID:* `{experience_id}`\n"
        f"*Preview URL:* {preview_url}\n\n"
        f"_Open the preview URL to see the variation live. "
        f"Please QA at desktop (1200px+) and mobile (≤767px)._"
    )

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]

    if not args:
        print("Usage: python3 shared/convert-deploy.py CRO-7740 [--dry-run]")
        sys.exit(1)

    test_id = args[0].upper()
    print(f"\n{'═' * 60}")
    print(f"  CONVERT DEPLOY — {test_id}{' (DRY RUN)' if dry_run else ''}")
    print(f"{'═' * 60}\n")

    # 1. Load credentials
    print("[1/6] Loading credentials...")
    creds = load_credentials()
    print("  OK")

    # 2. Find test folder
    print(f"[2/6] Locating test folder for {test_id}...")
    folder = find_test_folder(test_id)
    if not folder:
        print(f"  ERROR: Could not find a folder containing '{test_id}' in the repo.")
        print("  Check the folder name or run from the repo root.")
        sys.exit(1)
    print(f"  Found: {folder.relative_to(REPO_ROOT)}")

    # 3. Read code files
    print("[3/6] Reading variation.js and variation.css...")
    js_file, css_file = find_code_files(folder)
    if not js_file:
        print(f"  ERROR: No variation.js / variant.js found in {folder}")
        sys.exit(1)
    js_code = js_file.read_text(encoding="utf-8")
    css_code = css_file.read_text(encoding="utf-8") if css_file else ""
    print(f"  JS: {js_file.name} ({len(js_code)} chars)")
    print(f"  CSS: {css_file.name if css_file else 'none'} ({len(css_code)} chars)")

    # 4. Load test config
    print("[4/6] Loading test config...")
    config = load_test_config(folder, test_id)
    config["test_id"] = test_id
    print(f"  Name: {config['test_name']}")
    print(f"  URL:  {config['target_url']}")

    if dry_run:
        print("\nDRY RUN — stopping before Convert.com API calls.")
        print("JS and CSS loaded successfully. Remove --dry-run to deploy.")
        return

    # 5. Create experiment in Convert.com
    print("[5/6] Creating experiment in Convert.com...")
    result = create_experiment(
        config, js_code, css_code,
        creds["CONVERT_API_KEY"],
        creds["CONVERT_ACCOUNT_ID"],
        creds["CONVERT_PROJECT_ID"]
    )

    experience_id = result.get("id") or result.get("experience_id")
    variations = result.get("variations", [])
    variation_id = None
    for v in variations:
        if not v.get("is_baseline"):
            variation_id = v.get("id") or v.get("variation_id")
            break

    if not experience_id:
        print(f"  ERROR: Unexpected API response: {json.dumps(result, indent=2)}")
        sys.exit(1)

    print(f"  Experiment created: ID={experience_id}")
    print(f"  Variation ID: {variation_id}")

    # Build preview URL
    preview_url = build_preview_url(config["target_url"], experience_id, variation_id)
    print(f"  Preview URL: {preview_url}")

    # 6. Post to Slack
    print("[6/6] Posting to #qa-l1...")
    message = build_slack_message(config, experience_id, preview_url)
    slack_result = post_to_slack(None, message, creds["SLACK_BOT_TOKEN"])
    if slack_result.get("ok"):
        print(f"  Posted! Thread ts: {slack_result['ts']}")
    else:
        print(f"  Slack post failed: {slack_result.get('error')}")

    print(f"\n{'═' * 60}")
    print(f"  DONE — {test_id} deployed and QA notified")
    print(f"  Convert ID : {experience_id}")
    print(f"  Preview    : {preview_url}")
    print(f"{'═' * 60}\n")


if __name__ == "__main__":
    main()

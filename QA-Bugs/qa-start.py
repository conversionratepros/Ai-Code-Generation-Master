#!/usr/bin/env python3
"""
QA Session Startup Script
Usage: python3 QA-Bugs/qa-start.py CRO-7740

Automates the full QA session startup:
  1. Finds the Slack thread for the named test in #qa-l1
  2. Pulls all thread replies
  3. Downloads all screenshot attachments to QA-Bugs/screenshots/
  4. Prints a formatted brief ready to work from
"""

import json
import os
import sys
import urllib.request
import urllib.parse
from datetime import datetime

# ── Config ────────────────────────────────────────────────────────────────────

CHANNEL_ID = "C08A6HKTMG8"
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "screenshots")

def get_token():
    token = os.environ.get("SLACK_BOT_TOKEN")
    if token:
        return token
    # Fallback: read from settings
    settings_path = os.path.join(os.path.dirname(__file__), "..", ".claude", "settings.local.json")
    settings_path = os.path.normpath(settings_path)
    if os.path.exists(settings_path):
        with open(settings_path) as f:
            data = json.load(f)
            return data.get("env", {}).get("SLACK_BOT_TOKEN", "")
    raise RuntimeError("SLACK_BOT_TOKEN not found in env or settings.local.json")

# ── Slack helpers ─────────────────────────────────────────────────────────────

def slack_get(endpoint, params, token):
    url = f"https://slack.com/api/{endpoint}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

def find_thread(test_id, token):
    """Search channel history for a message mentioning test_id."""
    print(f"  Searching #qa-l1 for '{test_id}'...")
    # Pull up to 200 messages to find the thread
    data = slack_get("conversations.history", {"channel": CHANNEL_ID, "limit": 200}, token)
    if not data.get("ok"):
        raise RuntimeError(f"Slack error: {data.get('error')}")
    for msg in data.get("messages", []):
        text = msg.get("text", "")
        if test_id.lower() in text.lower():
            return msg
    return None

def pull_replies(thread_ts, token):
    """Get all replies in a thread."""
    data = slack_get("conversations.replies", {"channel": CHANNEL_ID, "ts": thread_ts, "limit": 100}, token)
    if not data.get("ok"):
        raise RuntimeError(f"Slack error: {data.get('error')}")
    return data.get("messages", [])

def download_screenshots(messages, token, test_id):
    """Download all image attachments from thread messages."""
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    downloaded = []
    bug_counter = 1

    for msg in messages:
        files = msg.get("files", [])
        for f in files:
            if f.get("mimetype", "").startswith("image/"):
                url = f.get("url_private")
                if not url:
                    continue
                # Name by bug number if message text contains "Bug #N", else sequential
                text = msg.get("text", "")
                bug_num = bug_counter
                for part in text.split():
                    if part.startswith("#") and part[1:].isdigit():
                        bug_num = int(part[1:])
                        break

                ext = f.get("filetype", "png")
                filename = f"bug_{bug_num}_{test_id.replace('-', '_')}.{ext}"
                filepath = os.path.join(SCREENSHOTS_DIR, filename)

                req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
                with urllib.request.urlopen(req) as resp:
                    with open(filepath, "wb") as out:
                        out.write(resp.read())

                downloaded.append({"bug": bug_num, "file": filepath, "msg": text.strip()[:120]})
                bug_counter += 1

    return downloaded

# ── Brief printer ─────────────────────────────────────────────────────────────

def print_brief(test_id, thread_msg, replies, screenshots):
    divider = "─" * 60
    print(f"\n{'═' * 60}")
    print(f"  QA SESSION BRIEF — {test_id}")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"{'═' * 60}\n")

    print(f"THREAD PARENT\n{divider}")
    print(f"  ts  : {thread_msg['ts']}")
    print(f"  text: {thread_msg.get('text', '')[:200]}\n")

    bugs = [r for r in replies[1:] if r.get("text", "").strip()]  # skip parent
    print(f"REPLIES ({len(bugs)} messages)\n{divider}")
    for i, msg in enumerate(bugs, 1):
        user = msg.get("user", "?")
        text = msg.get("text", "").strip().replace("\n", " ")[:160]
        has_files = "📎" if msg.get("files") else "  "
        print(f"  {has_files} [{i}] {user}: {text}")

    print(f"\nSCREENSHOTS DOWNLOADED ({len(screenshots)})\n{divider}")
    if screenshots:
        for s in screenshots:
            print(f"  Bug #{s['bug']} → {s['file']}")
    else:
        print("  None found.")

    print(f"\nNEXT STEPS\n{divider}")
    print("  1. Read the test's variation.js + variation.css before touching anything")
    print("  2. Analyse each bug against the actual code — verify it exists before fixing")
    print("  3. Fix one bug at a time")
    print(f"  4. Post summary table to thread ts={thread_msg['ts']}")
    print(f"\n{'═' * 60}\n")

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 QA-Bugs/qa-start.py CRO-7740")
        sys.exit(1)

    test_id = sys.argv[1].upper()
    print(f"\nStarting QA session for {test_id}...")

    token = get_token()

    print("  [1/4] Finding Slack thread...")
    thread_msg = find_thread(test_id, token)
    if not thread_msg:
        print(f"  No thread found mentioning '{test_id}' in the last 200 messages.")
        print("  Try scrolling further back or check the test ID spelling.")
        sys.exit(1)
    print(f"  Found thread: ts={thread_msg['ts']}")

    print("  [2/4] Pulling replies...")
    replies = pull_replies(thread_msg["ts"], token)
    print(f"  {len(replies)} messages in thread")

    print("  [3/4] Downloading screenshots...")
    screenshots = download_screenshots(replies, token, test_id)
    print(f"  {len(screenshots)} screenshot(s) saved to QA-Bugs/screenshots/")

    print("  [4/4] Building brief...")
    print_brief(test_id, thread_msg, replies, screenshots)


if __name__ == "__main__":
    main()

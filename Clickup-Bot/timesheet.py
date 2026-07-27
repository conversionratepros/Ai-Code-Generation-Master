#!/usr/bin/env python3
"""
ClickUp → Google Sheets Timesheet Automation
=============================================
Pulls your time entries from ClickUp and appends them to the client
Google Sheet in the exact same format you currently fill in manually.

Usage:
  python3 Clickup-Bot/timesheet.py              # append today's entries
  python3 Clickup-Bot/timesheet.py --week       # append this full week
  python3 Clickup-Bot/timesheet.py --date 2026-06-30   # specific date
  python3 Clickup-Bot/timesheet.py --dry-run    # preview without writing

One-time Google setup required (see bottom of this file).
"""

import json
import os
import sys
import urllib.request
from datetime import datetime, timedelta
from pathlib import Path

# ── Credentials ───────────────────────────────────────────────────────────────

REPO_ROOT   = Path(__file__).parent.parent
SETTINGS    = REPO_ROOT / ".claude" / "settings.local.json"
CREDENTIALS = Path(__file__).parent / "google-credentials.json"  # service account JSON

CLICKUP_TOKEN = "pk_93866005_SKUVLONE0T5Q4C1Y8MNWP0KRVB34DKG7"
CLICKUP_TEAM  = "20651070"
CLICKUP_USER  = "93866005"
SHEET_ID      = "1gF7Kg06qXnpvFsWwOu8bBPX5H3zgYnQCB31Aiz1qHTQ"
SHEET_TAB     = 0  # first tab

# ── Tag → Notes label mapping ─────────────────────────────────────────────────

TAG_TO_NOTE = {
    "development":        "Development",
    "shopify development": "Shopify Development",
    "code setup":         "Code Setup",
    "test updates":       "Test Updates",
    "test analysis":      "Test Analysis",
    "test analysis (grooming)": "Test Analysis (Grooming)",
    "bug fixing":         "Bug Fixing",
    "bug fix":            "Bug FIx",
    "technical analysis": "Technical Analysis",
    "additional updates": "Additional Updates",
    "meetings":           "Meetings",
    "admin":              "Admin",
    "leave":              "Leave",
}

# ── Duration formatting ───────────────────────────────────────────────────────

def ms_to_display(ms):
    """Convert milliseconds to '1hr 30min' display format."""
    total_mins = round(int(ms) / 60000)
    hrs = total_mins // 60
    mins = total_mins % 60
    if hrs == 0:
        return f"{mins}min"
    if mins == 0:
        return f"{hrs}hr"
    return f"{hrs}hr {mins}min"

def ms_to_decimal(ms):
    """Convert milliseconds to decimal hours, rounded to nearest 0.25."""
    hrs = int(ms) / 3600000
    return round(hrs * 4) / 4

def date_display(dt):
    """Format datetime as '7 June 2026'."""
    return dt.strftime("%-d %B %Y")

# ── ClickUp API ───────────────────────────────────────────────────────────────

def fetch_time_entries(start_dt, end_dt):
    start_ms = int(start_dt.timestamp() * 1000)
    end_ms   = int(end_dt.timestamp() * 1000)
    url = (
        f"https://api.clickup.com/api/v2/team/{CLICKUP_TEAM}/time_entries"
        f"?start_date={start_ms}&end_date={end_ms}&assignee={CLICKUP_USER}"
    )
    req = urllib.request.Request(url, headers={"Authorization": CLICKUP_TOKEN})
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read()).get("data", [])

def entries_to_rows(entries):
    """
    Convert raw ClickUp time entries into sheet rows, grouped and sorted by date.
    Returns: { 'YYYY-MM-DD': [ [date_str, task, hours_display, notes, decimal], ... ] }
    """
    from collections import defaultdict
    by_date = defaultdict(list)

    for e in entries:
        start_dt  = datetime.fromtimestamp(int(e["start"]) / 1000)
        date_key  = start_dt.strftime("%Y-%m-%d")
        date_str  = date_display(start_dt)
        task_name = e.get("task", {}).get("name", "Admin / No task")
        duration  = e.get("duration", 0)
        tags      = e.get("tags", [])
        tag_name  = tags[0].get("name", "").lower() if tags else ""
        notes     = TAG_TO_NOTE.get(tag_name, tag_name.title() if tag_name else "Admin")

        by_date[date_key].append([
            date_str,
            task_name,
            ms_to_display(duration),
            notes,
            ms_to_decimal(duration),
        ])

    # Sort entries within each day by start time (already chronological from API)
    return dict(sorted(by_date.items()))

# ── Google Sheets ─────────────────────────────────────────────────────────────

def get_sheet():
    """Authenticate and return the worksheet."""
    import gspread
    from google.oauth2.service_account import Credentials

    if not CREDENTIALS.exists():
        print(f"\nERROR: Google credentials not found at {CREDENTIALS}")
        print("See setup instructions at the bottom of this file.")
        sys.exit(1)

    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
    ]
    creds = Credentials.from_service_account_file(str(CREDENTIALS), scopes=scopes)
    client = gspread.authorize(creds)
    return client.open_by_key(SHEET_ID).get_worksheet(SHEET_TAB)

def get_existing_dates(sheet):
    """Return a set of date strings already in the sheet (e.g. '29 June 2026')."""
    col_a = sheet.col_values(1)
    return set(v.strip() for v in col_a if v.strip() and v.strip() not in ("Date", "≈"))

def append_day(sheet, date_str, rows, dry_run=False):
    """Append one day's rows + daily total to the sheet."""
    day_total = sum(r[4] for r in rows)
    all_rows  = rows + [["", "", "", "", day_total], ["", "", "", "", ""], ["", "", "", "", ""]]

    if dry_run:
        print(f"\n  [DRY RUN] Would append {len(rows)} rows for {date_str}:")
        for r in rows:
            print(f"    {r[0]} | {r[1][:50]} | {r[2]} | {r[3]} | {r[4]}")
        print(f"    ── Daily total: {day_total}h")
        return

    sheet.append_rows(all_rows, value_input_option="USER_ENTERED")
    print(f"  ✓ {date_str}: {len(rows)} entries, {day_total}h total")

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    dry_run = "--dry-run" in sys.argv

    # Parse date range
    if "--week" in sys.argv:
        today = datetime.now()
        start = today.replace(hour=0, minute=0, second=0) - timedelta(days=today.weekday())
        end   = today.replace(hour=23, minute=59, second=59)
        print(f"Fetching full week: {start.strftime('%Y-%m-%d')} → {end.strftime('%Y-%m-%d')}")
    elif "--date" in sys.argv:
        idx   = sys.argv.index("--date")
        d     = datetime.strptime(sys.argv[idx + 1], "%Y-%m-%d")
        start = d.replace(hour=0, minute=0, second=0)
        end   = d.replace(hour=23, minute=59, second=59)
        print(f"Fetching: {start.strftime('%Y-%m-%d')}")
    else:
        today = datetime.now()
        start = today.replace(hour=0, minute=0, second=0)
        end   = today.replace(hour=23, minute=59, second=59)
        print(f"Fetching today: {start.strftime('%Y-%m-%d')}")

    # Pull ClickUp entries
    print("Pulling time entries from ClickUp...")
    entries = fetch_time_entries(start, end)
    print(f"  {len(entries)} entries found")

    if not entries:
        print("Nothing to add.")
        return

    by_date = entries_to_rows(entries)

    if dry_run:
        print(f"\n{'─'*50}")
        print("DRY RUN PREVIEW (nothing written to sheet)")
        print(f"{'─'*50}")
        for date_key, rows in by_date.items():
            append_day(None, rows[0][0], rows, dry_run=True)
        print(f"\n{'─'*50}")
        return

    # Connect to Google Sheets
    print("Connecting to Google Sheets...")
    sheet = get_sheet()
    existing = get_existing_dates(sheet)
    print(f"  Sheet currently has entries up to: {sorted(existing)[-1] if existing else 'empty'}")

    # Append only dates not already in the sheet
    added = 0
    for date_key, rows in by_date.items():
        date_str = rows[0][0]
        if date_str in existing:
            print(f"  Skipping {date_str} — already in sheet")
            continue
        append_day(sheet, date_str, rows)
        added += 1

    print(f"\nDone — {added} day(s) added to the sheet.")

if __name__ == "__main__":
    main()


# =============================================================================
# ONE-TIME GOOGLE SETUP (takes ~10 minutes, never again after)
# =============================================================================
#
# 1. Go to https://console.cloud.google.com
# 2. Create a new project (name it anything, e.g. "CRP Timesheet")
# 3. In the search bar, find "Google Sheets API" → Enable it
# 4. Also enable "Google Drive API"
# 5. Go to IAM & Admin → Service Accounts → Create Service Account
#    - Name: "timesheet-bot" → click Done
# 6. Click the service account → Keys tab → Add Key → JSON
#    - Download the JSON file
# 7. Save it as: Clickup-Bot/google-credentials.json
# 8. Open the JSON — copy the "client_email" value (looks like:
#    timesheet-bot@your-project.iam.gserviceaccount.com)
# 9. Open your Google Sheet → Share → paste that email → Editor access → Done
#
# That's it. Run: python3 Clickup-Bot/timesheet.py --dry-run
# =============================================================================

#!/usr/bin/env python3
"""
token-saver skill — save_snapshot.py
Saves a context snapshot every N steps to prevent context drift
in long sessions. Also used to restore context if the session
drifts or a new chat is started.
Usage:
  python save_snapshot.py           # save current snapshot
  python save_snapshot.py --restore # print restore prompt for new session
"""

import argparse
import json
import os
import datetime

SESSION_DIR = ".session"

def save_snapshot():
    state_path = os.path.join(SESSION_DIR, "state.json")
    snapshot_path = os.path.join(SESSION_DIR, "context_snapshot.md")
    log_path = os.path.join(SESSION_DIR, "log.md")
    index_path = os.path.join(SESSION_DIR, "file_index.md")

    if not os.path.exists(state_path):
        print("❌ No active session found. Run session_init.py first.")
        return

    with open(state_path) as f:
        state = json.load(f)

    now = datetime.datetime.now().isoformat()

    archive_path = os.path.join(SESSION_DIR, f"snapshot_{now[:19].replace(':', '-')}.md")
    with open(archive_path, "w") as out:
        out.write(f"# Auto-Snapshot — {now}\n\n")
        out.write(f"**Task:** {state.get('task', 'unknown')}\n")
        out.write(f"**Current step:** {state.get('current_step')} / {state.get('total_steps', '?')}\n")
        out.write(f"**Status:** {state.get('status')}\n\n")

        # Embed context snapshot
        if os.path.exists(snapshot_path):
            out.write("## Context & Decisions\n\n")
            with open(snapshot_path) as f:
                out.write(f.read())
            out.write("\n\n")

        # Embed file index
        if os.path.exists(index_path):
            out.write("## File Index\n\n")
            with open(index_path) as f:
                out.write(f.read())
            out.write("\n\n")

        # Last 10 log lines
        if os.path.exists(log_path):
            with open(log_path) as f:
                lines = f.readlines()
            out.write("## Last 10 Log Entries\n\n")
            out.write("".join(lines[-10:]))

    print(f"✅ Snapshot saved: {archive_path}")
    print(f"   Step: {state.get('current_step')} / {state.get('total_steps', '?')}")

def restore_prompt():
    """Prints a compact resume prompt to paste into a new chat session."""
    state_path = os.path.join(SESSION_DIR, "state.json")
    snapshot_path = os.path.join(SESSION_DIR, "context_snapshot.md")
    index_path = os.path.join(SESSION_DIR, "file_index.md")
    plan_path = os.path.join(SESSION_DIR, "plan.md")

    print("=" * 60)
    print("RESUME PROMPT — paste this into a new chat to continue")
    print("=" * 60)
    print()

    if os.path.exists(state_path):
        with open(state_path) as f:
            state = json.load(f)
        print(f"TASK: {state.get('task')}")
        print(f"RESUME FROM: Step {state.get('current_step')} of {state.get('total_steps', '?')}")
        print(f"SESSION STATUS: {state.get('status')}")
        print()

    if os.path.exists(snapshot_path):
        print("--- CONTEXT SNAPSHOT ---")
        with open(snapshot_path) as f:
            content = f.read()
        # Print only key sections, compressed
        lines = content.split("\n")
        for line in lines:
            if line.strip() and not line.startswith("*(agent"):
                print(line)
        print()

    if os.path.exists(index_path):
        print("--- FILES STATUS ---")
        with open(index_path) as f:
            print(f.read())

    print("--- INSTRUCTION ---")
    print("Activate token-saver skill. Load state from .session/state.json.")
    print("Continue from the step indicated above. Do NOT restart from scratch.")
    print("=" * 60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Save or restore a session snapshot")
    parser.add_argument("--restore", action="store_true", help="Print a restore/resume prompt for a new session")
    args = parser.parse_args()

    if args.restore:
        restore_prompt()
    else:
        save_snapshot()

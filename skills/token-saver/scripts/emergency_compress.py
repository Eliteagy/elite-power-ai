#!/usr/bin/env python3
"""
token-saver skill — emergency_compress.py
When the context window is nearly full, this script compresses
the last N steps into a minimal summary and generates a rescue
prompt to continue in a new session.
Usage: python emergency_compress.py [--steps 20]
"""

import argparse
import json
import os
import datetime

SESSION_DIR = ".session"

def emergency_compress(last_n_steps: int = 20):
    state_path = os.path.join(SESSION_DIR, "state.json")
    log_path = os.path.join(SESSION_DIR, "log.md")
    index_path = os.path.join(SESSION_DIR, "file_index.md")
    snapshot_path = os.path.join(SESSION_DIR, "context_snapshot.md")

    now = datetime.datetime.now().isoformat()
    rescue_path = os.path.join(SESSION_DIR, f"rescue_{now[:10]}.md")

    print("🚨 EMERGENCY COMPRESSION ACTIVATED")
    print(f"   Compressing last {last_n_steps} steps...\n")

    state = {}
    if os.path.exists(state_path):
        with open(state_path) as f:
            state = json.load(f)

    # Read last N lines of log
    log_lines = []
    if os.path.exists(log_path):
        with open(log_path) as f:
            all_lines = f.readlines()
        log_lines = all_lines[-last_n_steps:]

    with open(rescue_path, "w") as out:
        out.write("# 🚨 Emergency Rescue File\n\n")
        out.write(f"**Created:** {now}\n")
        out.write(f"**Reason:** Context window nearly full\n\n")
        out.write("---\n\n")

        out.write("## Minimal Resume Prompt\n\n")
        out.write("```\n")
        out.write("EMERGENCY RESUME — paste into new session\n\n")
        out.write(f"Task: {state.get('task', 'see state.json')}\n")
        out.write(f"Step: {state.get('current_step')} of {state.get('total_steps', '?')}\n\n")

        # Key decisions from snapshot
        if os.path.exists(snapshot_path):
            with open(snapshot_path) as f:
                snap = f.read()
            # Extract only Decisions section
            if "## Decisions Made" in snap:
                decisions_block = snap.split("## Decisions Made")[1].split("##")[0].strip()
                out.write(f"Decisions made:\n{decisions_block}\n\n")

        out.write("Files still pending: see .session/file_index.md\n")
        out.write("Load: .session/state.json\n")
        out.write("Activate token-saver skill. Do NOT restart.\n")
        out.write("```\n\n")

        out.write("## Last Actions (compressed)\n\n")
        if log_lines:
            out.write("".join(log_lines))
        else:
            out.write("*(no log entries found)*\n")

        out.write("\n\n## Pending Files\n\n")
        if os.path.exists(index_path):
            with open(index_path) as f:
                out.write(f.read())

    print(f"✅ Rescue file created: {rescue_path}")
    print()
    print("NEXT STEPS:")
    print(f"  1. Copy the 'Minimal Resume Prompt' from {rescue_path}")
    print("  2. Start a new session with your AI agent")
    print("  3. Paste the prompt and activate token-saver skill")
    print("  4. The agent will continue from where we left off")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Emergency context compression for long sessions")
    parser.add_argument("--steps", type=int, default=20, help="Number of recent steps to compress")
    args = parser.parse_args()
    emergency_compress(args.steps)

#!/usr/bin/env python3
"""
token-saver skill — session_end.py
Closes the session and generates a handoff.md report so the next
session (or next day) can resume in under 30 seconds.
Usage: python session_end.py [--reason "end of day / blocked / complete"]
"""

import argparse
import json
import os
import datetime

SESSION_DIR = ".session"

def end_session(reason: str = "manual end"):
    state_path = os.path.join(SESSION_DIR, "state.json")
    log_path = os.path.join(SESSION_DIR, "log.md")
    snapshot_path = os.path.join(SESSION_DIR, "context_snapshot.md")
    index_path = os.path.join(SESSION_DIR, "file_index.md")
    plan_path = os.path.join(SESSION_DIR, "plan.md")
    handoff_path = os.path.join(SESSION_DIR, "handoff.md")

    if not os.path.exists(state_path):
        print("❌ No active session. Nothing to close.")
        return

    with open(state_path) as f:
        state = json.load(f)

    now = datetime.datetime.now().isoformat()
    current = state.get("current_step", 1)
    total = state.get("total_steps") or "?"
    task = state.get("task", "unknown task")
    started = state.get("started_at", "unknown")

    # Calculate progress
    pct = f"{int(current / total * 100)}%" if isinstance(total, int) and total > 0 else "unknown"

    # Update state
    state["status"] = "paused"
    state["paused_at"] = now
    state["pause_reason"] = reason
    with open(state_path, "w") as f:
        json.dump(state, f, indent=2)

    # Write handoff report
    with open(handoff_path, "w") as out:
        out.write("# Session Handoff Report\n\n")
        out.write(f"**Generated:** {now}\n")
        out.write(f"**Task:** {task}\n")
        out.write(f"**Reason paused:** {reason}\n")
        out.write(f"**Progress:** Step {current} / {total} ({pct})\n")
        out.write(f"**Session started:** {started}\n\n")
        out.write("---\n\n")

        out.write("## How to Resume\n\n")
        out.write("```\n")
        out.write("1. Open a new chat with your AI agent\n")
        out.write("2. Activate the token-saver skill\n")
        out.write(f"3. Say: 'Resume session from step {current}. Load .session/state.json'\n")
        out.write("4. The agent will read state.json and continue from where we left off\n")
        out.write("```\n\n")

        out.write("## Resume Prompt (copy-paste)\n\n")
        out.write("```\n")
        out.write(f"RESUME SESSION — token-saver skill\n")
        out.write(f"Task: {task}\n")
        out.write(f"Start from: Step {current} of {total}\n")
        out.write("Load: .session/state.json and .session/context_snapshot.md\n")
        out.write("Do NOT restart. Continue from the step above.\n")
        out.write("```\n\n")

        # Embed file index
        if os.path.exists(index_path):
            out.write("## Files Modified This Session\n\n")
            with open(index_path) as f:
                out.write(f.read())
            out.write("\n\n")

        # Embed context snapshot (decisions)
        if os.path.exists(snapshot_path):
            out.write("## Key Decisions (must carry forward)\n\n")
            with open(snapshot_path) as f:
                out.write(f.read())
            out.write("\n\n")

        # Last 5 log lines
        if os.path.exists(log_path):
            with open(log_path) as f:
                lines = f.readlines()
            out.write("## Last Actions\n\n")
            out.write("".join(lines[-5:]))

    print(f"\n✅ Session closed.")
    print(f"   Task:     {task}")
    print(f"   Progress: Step {current} / {total} ({pct})")
    print(f"   Reason:   {reason}")
    print(f"\n📋 Handoff report: {handoff_path}")
    print("   Share this file with the next session to resume instantly.\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="End the current session and generate a handoff report")
    parser.add_argument("--reason", default="manual end", help="Why the session is ending")
    args = parser.parse_args()
    end_session(args.reason)

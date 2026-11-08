#!/usr/bin/env python3
"""
token-saver skill — session_init.py
Initialises a long coding session. Creates .session/ folder with plan,
state tracker, file index, and context snapshot.
Usage: python session_init.py --task "describe the task here"
"""

import argparse
import json
import os
import datetime

SESSION_DIR = ".session"

def init_session(task: str):
    os.makedirs(SESSION_DIR, exist_ok=True)
    now = datetime.datetime.now().isoformat()

    # plan.md — human-readable task breakdown placeholder
    plan_path = os.path.join(SESSION_DIR, "plan.md")
    if not os.path.exists(plan_path):
        with open(plan_path, "w") as f:
            f.write(f"# Session Plan\n\n")
            f.write(f"**Started:** {now}\n")
            f.write(f"**Task:** {task}\n\n")
            f.write("## Steps\n\n")
            f.write("<!-- The AI agent will populate this with numbered micro-steps -->\n")
            f.write("1. [ ] Analyse codebase structure\n")
            f.write("2. [ ] Define patterns and conventions\n")
            f.write("3. [ ] Execute changes file by file\n")
            f.write("4. [ ] Run tests and verify\n")
            f.write("5. [ ] Generate handoff report\n")

    # state.json — machine-readable progress tracker
    state_path = os.path.join(SESSION_DIR, "state.json")
    if not os.path.exists(state_path):
        state = {
            "task": task,
            "started_at": now,
            "current_step": 1,
            "total_steps": None,
            "status": "active",
            "steps": {}
        }
        with open(state_path, "w") as f:
            json.dump(state, f, indent=2)

    # file_index.md — tracks every file in the session
    index_path = os.path.join(SESSION_DIR, "file_index.md")
    if not os.path.exists(index_path):
        with open(index_path, "w") as f:
            f.write("# File Index\n\n")
            f.write("| File | Status | Last Read | Notes |\n")
            f.write("|------|--------|-----------|-------|\n")
            f.write("| *(agent fills this as files are touched)* | - | - | - |\n")

    # context_snapshot.md — stores decisions and patterns
    snapshot_path = os.path.join(SESSION_DIR, "context_snapshot.md")
    if not os.path.exists(snapshot_path):
        with open(snapshot_path, "w") as f:
            f.write("# Context Snapshot\n\n")
            f.write(f"**Task:** {task}\n\n")
            f.write("## Decisions Made\n\n")
            f.write("*(agent writes architectural decisions here as they are made)*\n\n")
            f.write("## Patterns Established\n\n")
            f.write("*(naming conventions, file structure, etc.)*\n\n")
            f.write("## Open Questions\n\n")
            f.write("*(blockers or decisions awaiting user input)*\n")

    # log.md — append-only action log
    log_path = os.path.join(SESSION_DIR, "log.md")
    if not os.path.exists(log_path):
        with open(log_path, "w") as f:
            f.write("# Session Log\n\n")
            f.write(f"**Session started:** {now}\n")
            f.write(f"**Task:** {task}\n\n")
            f.write("---\n\n")

    print(f"✅ Session initialised in {SESSION_DIR}/")
    print(f"   plan.md            — task breakdown")
    print(f"   state.json         — progress tracker")
    print(f"   file_index.md      — file status tracker")
    print(f"   context_snapshot.md — decisions & patterns")
    print(f"   log.md             — append-only action log")
    print(f"\nTask: {task}")
    print(f"Ready. Begin with Step 1.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Initialise a token-efficient long coding session")
    parser.add_argument("--task", required=True, help="Description of the task for this session")
    args = parser.parse_args()
    init_session(args.task)

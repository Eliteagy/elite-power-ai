---
name: token-saver
description: >
  Activate this skill for any long coding session, large codebase editing,
  multi-file refactoring, or when the user says "don't waste tokens",
  "work efficiently", "long session", "10 hour edit", "save context",
  "don't repeat yourself", or starts a task that will require many steps.
  Also activate when files are large (>200 lines) or when many files are involved.
license: MIT
version: 1.0.0
author: custom
---

# Token Saver — Long Session Efficiency Skill

This skill transforms how the AI agent manages context, memory, and output
during long coding and editing sessions. The goal is to sustain high-quality
work for hours without wasting tokens on repetition, verbosity, or unnecessary
re-reading of files.

---

## Core Philosophy

> **Read once. Plan fully. Act precisely. Never repeat.**

Every token spent re-explaining context, re-reading unchanged files, or
writing verbose commentary is a token stolen from actual work.
This skill enforces strict economy of output while maximising usefulness.

---

## Activation Triggers

- Session expected to last more than 30 minutes
- Codebase has more than 3 files or 500 total lines
- User says: "work efficiently", "don't waste tokens", "long session",
  "edit all files", "refactor everything", "marathon session"
- Task involves multi-step pipelines (design → code → test → deploy)

---

## Session Management Protocol

### Phase 0 — Session Initialisation (run ONCE at start)

Before writing a single line of code, run the initialisation script:

```bash
python scripts/session_init.py --task "<user task description>"
```

This creates a `.session/` folder with:
- `plan.md` — full task breakdown into numbered micro-steps
- `state.json` — tracks which steps are done, in progress, or pending
- `file_index.md` — lists every file touched and its current status
- `context_snapshot.md` — key decisions and patterns established so far

**Never skip Phase 0.** It is the foundation that prevents context drift.

---

### Phase 1 — Chunked Execution

Work in **chunks of maximum 50 lines of code per response**.

Rules:
1. Read `state.json` at the start of every response to know where you are
2. Complete exactly ONE micro-step per response — no more
3. Update `state.json` immediately after completing each step
4. Write a one-line log entry to `.session/log.md` for every action taken
5. Never re-read a file you already read unless the file has changed

**Chunk format (use this every response):**

```
[STEP N/TOTAL] — <step name>
Status: ▶ In Progress
Files touched: <list>
---
<code or action>
---
Next: [STEP N+1] — <next step name>
```

---

### Phase 2 — Token Compression Rules

#### What to NEVER do (wastes tokens):
- ❌ Re-explain the full task at every step
- ❌ Write "Sure! I'll help you with..." preambles
- ❌ Repeat unchanged code in full — use diffs only
- ❌ Add excessive inline comments on obvious code
- ❌ Re-read files that haven't changed since last read
- ❌ Write long "what I'm about to do" paragraphs before doing it
- ❌ Summarise what you just did in detail — log it instead

#### What to ALWAYS do (saves tokens):
- ✅ Use unified diff format for edits (+ / - lines only)
- ✅ Reference files by name, not by repeating their content
- ✅ Use short status markers: ✅ Done / ▶ Active / ⏳ Pending / ❌ Blocked
- ✅ Keep all prose under 3 sentences per response
- ✅ Store decisions in `.session/context_snapshot.md`, not in the chat
- ✅ Use abbreviations for repeated patterns (e.g. "same pattern as auth.py")

---

### Phase 3 — Smart File Reading Strategy

Before reading any file, check `.session/file_index.md`:
- If file is listed as "read" and "unchanged" → skip reading, use cached summary
- If file is listed as "modified" → read only the changed section (use line ranges)
- If file is new → read fully, then add to index

**Line-range reading** (use always for files >100 lines):
```bash
python scripts/smart_read.py --file <path> --lines <start>-<end>
```

Never read an entire 500-line file to edit 3 lines.

---

### Phase 4 — Context Snapshot System

Every 10 steps, auto-save a context snapshot:
```bash
python scripts/save_snapshot.py
```

The snapshot stores:
- Architectural decisions made
- Patterns established (naming, structure, conventions)
- Files completed vs pending
- Any blockers or open questions

If context ever feels "lost", restore from snapshot:
```bash
python scripts/restore_snapshot.py
```

This prevents the session from degrading over long periods.

---

### Phase 5 — Session End / Handoff

When the session ends (or hits a break point), generate a handoff report:
```bash
python scripts/session_end.py
```

Output: `.session/handoff.md` containing:
- % of task completed
- Exact step to resume from
- Files modified and their final state
- Any decisions the next session must know about

**This makes the next session start in 30 seconds, not 30 minutes.**

---

## Output Length Rules

| Response type | Max length |
|--------------|------------|
| Status update | 2 lines |
| Code edit (diff) | 50 lines |
| New file creation | 80 lines |
| Explanation | 5 sentences |
| Error diagnosis | 10 lines |
| Full file rewrite | Only if <60 lines total |

---

## Diff-First Editing

Always prefer diffs over full rewrites.

**Instead of this (wasteful):**
```python
# Full 80-line file repeated with 2 lines changed
def foo():
    ...
    (78 more lines)
```

**Do this (efficient):**
```diff
--- a/utils.py
+++ b/utils.py
@@ -14,7 +14,7 @@
-    return result
+    return result.strip()
```

---

## Anti-Drift Rules

As sessions get long, AI agents tend to "drift" — forgetting earlier decisions,
repeating work, or becoming verbose. These rules prevent drift:

1. **Anchor check** — every 5 steps, read `plan.md` first line to re-anchor
2. **Pattern lock** — once a naming/structure pattern is set, never deviate
3. **Decision log** — any architectural choice goes into `context_snapshot.md`
   immediately, not just in the chat
4. **No re-invention** — if a utility function was written in step 3, use it in
   step 15 without re-writing it
5. **Silent progress** — prefer doing over explaining; log actions, don't narrate them

---

## Emergency Token Recovery

If the session is running out of context:

```bash
python scripts/emergency_compress.py
```

This script:
1. Summarises the last 20 steps into 5 bullet points
2. Lists only the files still pending
3. Outputs a minimal "resume prompt" the user can paste into a new session

---

## Example Session Flow

```
User: "Refactor my entire Express API to use TypeScript — it has 12 files"

Agent activates token-saver skill.

[INIT] — Runs session_init.py
       → Creates plan.md with 24 micro-steps
       → Creates file_index.md with all 12 files

[STEP 1/24] — Convert routes/auth.js → routes/auth.ts
Files: routes/auth.js
Diff: (12 lines changed)
Next: [STEP 2/24] — Convert routes/users.js

[STEP 2/24] — Convert routes/users.js → routes/users.ts
Files: routes/users.js
Note: Same pattern as auth.ts (see step 1)
Diff: (9 lines changed)
Next: [STEP 3/24] — Convert middleware/validate.js

... continues efficiently for all 24 steps ...

[DONE] — Runs session_end.py → handoff.md generated
```

Total token usage: ~60% less than an unstructured session.
Session sustained for hours without context loss.

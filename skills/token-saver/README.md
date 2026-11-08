# token-saver

**A Pika-style skill for AI coding agents that sustains long editing sessions (10h+) with minimal token waste.**

---

## What it does

Most AI coding sessions degrade after 30–60 minutes — the agent starts repeating itself,
re-reading unchanged files, writing verbose output, and losing track of earlier decisions.

The `token-saver` skill fixes this with:

- 📋 **Session planning** — breaks any task into numbered micro-steps before writing a single line
- 🗂 **File index** — tracks which files have been read/modified so they're never re-read unnecessarily
- 💾 **Context snapshots** — saves architectural decisions every 10 steps so they're never forgotten
- 🔁 **Handoff reports** — lets you resume a session in a new chat in under 30 seconds
- 🚨 **Emergency compress** — when context fills up, generates a minimal rescue prompt instantly
- ✂️ **Diff-first editing** — enforces diffs instead of full file rewrites (60–80% fewer tokens)

---

## Install

Point your agent at this folder:

```
install /path/to/token-saver/
```

Or with Claude Code:
```bash
# In your project root
cp -r token-saver/ .skills/
```

---

## Usage

### Start a session
```bash
python .skills/token-saver/scripts/session_init.py --task "Refactor Express API to TypeScript"
```

### Read files efficiently (skip unchanged, use line ranges)
```bash
python .skills/token-saver/scripts/smart_read.py --file routes/auth.js --lines 10-50
python .skills/token-saver/scripts/smart_read.py --file utils.py --summary
```

### Save a context snapshot (every 10 steps)
```bash
python .skills/token-saver/scripts/save_snapshot.py
```

### Generate a restore prompt (for a new chat)
```bash
python .skills/token-saver/scripts/save_snapshot.py --restore
```

### End a session and generate handoff report
```bash
python .skills/token-saver/scripts/session_end.py --reason "end of day"
```

### Emergency: context window nearly full
```bash
python .skills/token-saver/scripts/emergency_compress.py --steps 20
```

---

## Session folder structure

After initialisation, a `.session/` folder is created in your project:

```
.session/
├── plan.md              ← task breakdown into micro-steps
├── state.json           ← machine-readable progress (current step, status)
├── file_index.md        ← every file touched + status
├── context_snapshot.md  ← decisions, patterns, conventions
├── log.md               ← append-only action log
├── read_cache.json      ← file hashes to skip re-reading unchanged files
└── handoff.md           ← resume prompt for next session
```

Add `.session/` to your `.gitignore` for personal projects, or commit it for team sessions.

---

## Token savings (typical)

| Without token-saver | With token-saver |
|--------------------|-----------------|
| Reads full 400-line file 5× | Reads it once, uses cache |
| Re-explains task every response | Task stored in plan.md |
| Writes full file when changing 3 lines | Writes unified diff (12 lines) |
| Forgets decisions after 30 steps | Snapshot restores all decisions |
| Session fails after 2h | Session sustained 10h+ |

**Estimated reduction: 55–70% fewer tokens per hour of work.**

---

## Requirements

- Python 3.8+
- No external dependencies (pure standard library)
- Compatible with: Claude Code, Cursor, OpenClaw, any agent that reads SKILL.md

---

## License

MIT

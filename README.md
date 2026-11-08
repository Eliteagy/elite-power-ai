# Elite Power AI

The Elite Agency's AI setup: a 3D office where AI agents work (Agent Floor), a command centre where Claude, GPT and Gemini work together, 42 Claude Code agents organised by department, and 441 skills.

## What is in here

| Folder | What it is |
|---|---|
| `agent-floor/` | The 3D office (Electron + Three.js). See below. |
| `agents/` | Claude Code agents. `global/` goes in `~/.claude/agents`; the others are per department. |
| `skills/` | 441 Claude Code skills (video editing, sales, marketing, programming, security, trading…). |
| `SKILLS-DE-FORA.md` | Skills that were not included (third-party licences or client-specific) and why. |

### Agent Floor

- **The building:** every Claude Code session shows up as a character at a desk, with live status, and departments sit on separate floors.
- **Comando** (key `C`): you give one order and the *Diretor IA* (Claude) splits it between GPT, Gemini, Claude and the agents, runs them in parallel and returns one answer.
- **3 IAs:** the same order goes to GPT, Gemini and Claude at once, and the answers are shown side by side for comparison.
- **Microphone:** dictation is transcribed locally with Whisper on the GPU, so no audio leaves the PC.
- **Attachments:** you can attach folders and files from the PC; Claude and GPT read them.
- **Full access:** a per-order switch that lets the workers edit files and run commands. Safety brakes stay on: no mass deletes, no git push, no publishing, no messages to third parties, no reading secrets.
- **Guia** (key `G`): a window with your projects (sites, apps, videos) that can open them in the browser or Explorer.
- **Liquid Glass:** an interface in Apple's glass style. Panels can be dragged or popped out into their own window.

## Installation

Requirements: Windows 10/11 (macOS works too), [Node.js 20+](https://nodejs.org), [Claude Code](https://claude.com/claude-code) with an active login.

### 1. Skills and agents

```powershell
# Skills
Copy-Item -Recurse skills\* $env:USERPROFILE\.claude\skills\
# Global agents
Copy-Item agents\global\*.md $env:USERPROFILE\.claude\agents\
```

Department agents (`agents/Ads`, `agents/Financas`…) go in `.claude\agents\` inside each department's folder, so they only appear when Claude Code is opened in that folder. If you'd rather have them everywhere, copy them into `~\.claude\agents` too.

### 2. Agent Floor

```powershell
cd agent-floor
npm install
npm run build
npm link                                  # puts the "agent-floor" command on the PATH
agent-floor setup claude --write          # adds the hooks to ~/.claude/settings.json
npm start                                 # opens the app (or: npx electron desktop/main.cjs)
```

From then on the floor opens by itself when a Claude Code session starts.

### 3. Optional: the other AIs and the microphone

| What | How |
|---|---|
| **GPT** | `npm i -g @openai/codex`, then `codex login` (with a ChatGPT Plus account). |
| **Gemini** | [OmniRoute](https://www.npmjs.com/package/omniroute) on port 20128, with an API key in `~/.claude-omniroute/omniroute.key`. A Google AI Pro account connects as the `antigravity` provider. |
| **Microphone** | Python 3.11+ and `pip install faster-whisper`. The `large-v3-turbo` model downloads on first use. On an NVIDIA GPU also run `pip install nvidia-cublas-cu12 nvidia-cudnn-cu12`. |

Without these, the Comando still works with Claude.

### 4. Your data

- `agent-floor/server/projects.json`: your projects for the Guia. It ships with examples.
- `agent-floor/server/residents.json`: who sits in each office.
- `agent-floor/src/world/consultants.ts`: the street with the consultants' houses. It ships with examples. For real data, create `consultants.local.json` (it is not committed).

## Notes

- All client data was replaced with examples before publishing.
- Some skills came from third parties and keep their original licences; read the `LICENSE` file in each skill folder before commercial use.
- Agent Floor is based on [develop212/agent-floor](https://github.com/develop212/agent-floor) (MIT).

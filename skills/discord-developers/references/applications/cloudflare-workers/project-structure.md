# Project structure
Context: Discord developer reference: Project structure
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](running-locally.md) / [Following source section](registering-commands.md)
<a id="source-project-structure"></a>

### Project structure

 The cloned app has this project layout:

```
├── .github/workflows/ci.yaml -> GitHub Action configuration
├── src
├── ├── commands.js           -> JSON payloads for commands
├── ├── reddit.js             -> Interactions with the Reddit API
├── ├── register.js           -> Sets up commands with the Discord API
├── ├── server.js             -> Discord app logic and routing
├── test
├── ├── test.js               -> Tests for app
├── wrangler.toml             -> Configuration for Cloudflare Workers
├── package.json
├── README.md
├── renovate.json             -> Configuration for repo automation
├── .eslintrc.json
├── .prettierignore
├── .prettierrc.json
└── .gitignore

```


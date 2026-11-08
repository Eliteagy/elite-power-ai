# Setting up the project
Context: Discord developer reference: Setting up the project
[Source](project-and-authentication-index.md) / [Previous source section](enable-developer-mode.md) / [Following source section](install-project-dependencies.md)
<a id="source-step-1-setting-up-the-project"></a>

### Step 1: Setting up the project

 Before creating the app, set up the project code from [`discord/getting-started-activity`](https://github.com/discord/getting-started-activity). Open a terminal and clone the repository:

```
git clone git@github.com:discord/getting-started-activity.git

```

 The cloned sample project has two main parts:
- `client` contains the sample Activity frontend, built with vanilla JavaScript and wired to [Vite](https://vitejs.dev/) for local development.
- `server` contains a backend written with vanilla JavaScript, Node.js, and Express. When building your own Activity, you can choose a different backend.

Project structure

Project layout for the sample app used in this guide

```
├── client
├────── main.js       -> your Activity frontend
├────── index.html
├────── package.json
├────── rocket.png
├────── vite.config.js
├── server
├────── package.json
├────── server.js     -> your Activity backend
└── .env              -> your credentials, IDs and secrets

```


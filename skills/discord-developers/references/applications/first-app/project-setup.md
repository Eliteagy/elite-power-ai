# Project setup
Context: Discord developer reference: Project setup
[Source](app-registration-and-commands-index.md) / [Previous source section](getting-started.md) / [Following source section](creating-an-app.md)
<a id="source-step-0-project-setup"></a>

### Step 0: Project Setup

 Start by preparing the local environment and retrieving code from the [sample app repository](https://github.com/discord/discord-example-app). This guide develops locally with help from [ngrok](https://ngrok.com/), though any preferred development environment can work. Install [NodeJS](https://nodejs.org/en/download/) first if it is not already installed. Then open a command line and clone the project:

```
git clone https://github.com/discord/discord-example-app.git

```

 Next, change into the directory and install the project's dependencies:

```
# navigate to directory
cd discord-example-app

# install dependencies
npm install

```

Project structure

Project layout for the sample app used by this tutorial

```
├── examples    -> short, feature-specific sample apps
├──── app.js  -> finished app.js code
├──── button.js
├──── command.js
├──── modal.js
├──── selectMenu.js
├── .env        -> your credentials and IDs
├── app.js      -> main entrypoint for app
├── commands.js -> slash command payloads + helpers
├── game.js     -> logic specific to Rock, Paper, Scissors
├── utils.js    -> utility functions and constants
├── package.json
├── README.md
└── .gitignore

```

 After setup, open the project in your preferred code editor and continue with Discord app configuration.


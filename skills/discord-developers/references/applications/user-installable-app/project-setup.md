# Project setup
Context: Discord developer reference: Project setup
[Source](developing-a-user-installable-app-index.md) / [Previous source section](developing-a-user-installable-app.md) / [Following source section](creating-an-app.md)
<a id="source-step-0-project-setup"></a>

### Step 0: Project Setup

 Start by getting the project code from the [sample app repository](https://github.com/discord/user-install-example).

Project structure

Project structure overview for the sample app used in this tutorial

```
├── .env.sample -> sample .env file
├── app.js      -> main entrypoint for the app
├── commands.js -> slash command payloads + helpers
├── game.js     -> logic specific to the fake game
├── utils.js    -> utility functions and enums
├── package.json
├── README.md
└── .gitignore

```

 This tutorial uses [ngrok](https://ngrok.com/) with local development, though you can use another development setup. If [NodeJS](https://nodejs.org/en/download/) is not installed, install it first. Then clone the project code from the command line:

```
git clone https://github.com/discord/user-install-example.git

```

 Next, move into the directory and install the project's dependencies:

```
# navigate to directory
cd user-install-example

# install dependencies
npm install

```

 After setup, open the project in your preferred code editor and continue with the Discord app configuration.


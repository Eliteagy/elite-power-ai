# Getting started
Context: Discord developer reference: Getting started
[Source](app-registration-and-commands-index.md) / [Following source section](project-setup.md)
<a id="source-getting-started-part-1"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

[Discord apps](https://docs.discord.com/developers/quick-start/overview-of-apps) let you extend Discord with APIs and interactive features. This JavaScript tutorial builds a first Discord app that uses slash commands, sends messages, and handles component interactions. If your goal is an iframe-based game or social experience, use the tutorial for [building an Activity](https://docs.discord.com/developers/activities/building-an-activity). The example app is a rock-paper-scissors variant with 7 choices instead of 3. The guide is written for beginners but expects basic [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics) knowledge.

What we'll be building

The completed app works like this: (Figure: Demo of example app) The user flow is:
1. User A starts a new game and selects an object with the app's `/challenge` slash command
2. The app posts a channel message containing a button for other users to accept the challenge
3. User B clicks the **Accept** button
4. User B receives an ephemeral message and chooses an object
5. The app posts the game result back to the original channel so everyone can see it

Resources used in this guide

Tools and technologies used in this tutorial

- **[GitHub repository](https://github.com/discord/discord-example-app)** containing the guide code plus extra feature-specific examples.
- **[discord-interactions](https://github.com/discord/discord-interactions-js)**, a library with Discord app types and helper functions.
- **[Express](https://expressjs.com)**, the JavaScript web framework used here to create a server that receives Discord requests.
- **[ngrok](https://ngrok.com/)**, a tunneling tool that exposes the local server through a public URL for Discord requests.

---


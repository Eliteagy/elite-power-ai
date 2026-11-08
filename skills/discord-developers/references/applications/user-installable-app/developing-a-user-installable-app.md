# Developing a user installable app
Context: Discord developer reference: Developing a user installable app
[Source](developing-a-user-installable-app-index.md) / [Following source section](project-setup.md)
<a id="source-developing-a-user-installable-app"></a>

# Developing A User Installable App

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Discord apps can be installed to servers, users, or both. This guide builds a simple game integration app that supports installation by both Discord users and servers. The tutorial centers on [installation contexts](https://docs.discord.com/developers/resources/application#installation-context) while creating a game integration with wiki lookup, user-specific bookmarking, and a server leaderboard. The app defines four commands (`/link`, `/profile`, `/leaderboard`, and `/wiki`) that run in different installation and interaction contexts, which the tutorial explains as it progresses.

Resources used in this guide

Tools and technologies used in this guide

- **[GitHub repository](https://github.com/discord/user-install-example)** containing the guide's sample code.
- **[discord-interactions](https://github.com/discord/discord-interactions-js)**, a library with types and helper functions for Discord apps.
- **[Express](https://expressjs.com/)**, the JavaScript web framework used to create the server that receives Discord requests.
- **[ngrok](https://ngrok.com/)**, a tunneling tool that exposes the local server at a public URL for Discord requests.

---


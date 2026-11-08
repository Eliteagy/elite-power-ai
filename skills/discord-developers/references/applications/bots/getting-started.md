# Getting started
Context: Discord developer reference: Getting started
[Source](bot-development-index.md) / [Previous source section](overview.md) / [Following source section](building-your-bot.md)
<a id="source-getting-started"></a>

### Getting Started

 Building a bot requires these setup steps:
- **Create an application** in the Discord Developer Portal, which stores the bot token, OAuth2 credentials, and app settings.
- **Add a bot user** on the application's Bot tab so Discord issues the token your program authenticates with.
- **Invite the bot** into a server through an OAuth2 URL that includes the bot scope plus the permissions it needs.
- **Connect to the API** through the Gateway for live events, the HTTP API for REST calls, or a combination of the two.
 Most projects use an established community library for their programming language instead of calling the API primitives by hand. Discord lists official and community options on [Community Resources](https://docs.discord.com/developers/developer-tools/community-resources). To start with a complete first project, follow the [Getting Started guide](https://docs.discord.com/developers/quick-start/getting-started), which covers creating and running an initial bot.


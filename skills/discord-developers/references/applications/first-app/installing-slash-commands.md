# Installing slash commands
Context: Discord developer reference: Installing slash commands
[Source](app-registration-and-commands-index.md) / [Previous source section](running-your-app.md) / [Following source section](handling-interactivity.md)
<a id="source-installing-slash-commands"></a>

### Installing slash commands

 Slash command installation in the sample uses [`node-fetch`](https://github.com/node-fetch/node-fetch). The installation implementation is in `utils.js` inside `DiscordRequest()`. The project includes a `register` script that installs commands from `ALL_COMMANDS`, defined at the bottom of `commands.js`. It bulk-overwrites global commands by calling the HTTP API's [`PUT /applications/<APP_ID>/commands`](https://docs.discord.com/developers/interactions/application-commands#bulk-overwrite-global-application-commands) endpoint. To change or add commands, use the command structure in the [commands documentation](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-structure). From the project folder, run:

```
npm run register

```

 Returning to the server should show the slash commands. Running them will not produce behavior yet because the app is not receiving or handling Discord requests.

What are Discord's APIs?

Overview of Discord's HTTP and Gateway APIs

Apps can combine these [APIs](https://docs.discord.com/developers/quick-start/overview-of-apps#what-apis-can-apps-use) to build Discord functionality:
- **[HTTP API](https://docs.discord.com/developers/reference#http-api)** is a REST-like API for general operations such as sending, updating, or fetching Discord resource data.
- **[Gateway API](https://docs.discord.com/developers/reference#gateway-websocket-api)** is a WebSocket API for maintaining state or listening to events in a Discord server. This guide does not use it, but the [Gateway documentation](https://docs.discord.com/developers/events/gateway) explains how to create a Gateway connection and what events are available.

---


# Account linking flows
Context: Discord developer reference: Account linking flows
[Source](entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](example-of-an-entry-point.md) / [Following source section](connected-game-flow.md)
<a id="source-account-linking-flows"></a>

### Account Linking Flows

 Discord currently offers two client-side account linking paths: connected game flow and web flow. After a user chooses an entry point in Discord, the client sends them through one available path. For user experience, Discord checks them in this order:
- [Connected game flow](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-from-discord#connected-game-flow)
- [Web flow](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-from-discord#web-flow)
 Choose the flow or flows that fit the game, then follow the relevant implementation steps. Supporting both can give players more account-linking options.

---


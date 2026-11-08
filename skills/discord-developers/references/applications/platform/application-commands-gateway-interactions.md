# Application commands gateway interactions
Context: Discord developer reference: Application commands gateway interactions
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](application-commands.md) / [Previous source section](message-components-modals.md) / [Following source section](application-commands-http-interactions.md)
<a id="source-gateway-interactions"></a>

### Gateway Interactions

 By default, apps receive interactions through the [Gateway](https://docs.discord.com/developers/events/gateway), the persistent WebSocket connection used for other real-time events. If the bot is already connected to listen for messages, member joins, or similar activity, interactions arrive over that same connection.


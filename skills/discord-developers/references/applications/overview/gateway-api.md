# Gateway API
Context: Discord developer reference: Gateway API
[Source](overview-of-apps-index.md) / [Previous source section](http-api.md) / [Following source section](bots-companion-apps.md)
<a id="source-gateway-api"></a>

### Gateway API

 The **Gateway API** is a WebSocket connection linking your app to Discord. It is commonly used for a live event stream from Discord, but traffic can move both ways, so the same connection can also send events from your app to Discord. Use the Gateway API to:
- Receive Discord events in real time, including messages, member joins, reactions, voice state changes, and more
- Set your bot's presence and status
- Control voice state and join voice channels
- Complete the connection handshake and maintain the Gateway connection lifecycle
 See the [API reference](https://docs.discord.com/developers/reference#gateway-websocket-api) for Gateway API usage details.


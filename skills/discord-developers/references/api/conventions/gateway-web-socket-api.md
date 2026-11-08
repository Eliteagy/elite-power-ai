# Gateway web socket API
Context: Discord developer reference: Gateway web socket API
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](array-query-strings.md) / [Following source section](message-formatting.md)
<a id="source-gateway-websocket-api"></a>

### Gateway (WebSocket) API

 Discord's Gateway API maintains persistent, stateful websocket connections between clients and Discord servers. Clients use those connections to send and receive real-time events and keep local state current. The Gateway API uses secure websocket connections under [RFC 6455](https://tools.ietf.org/html/rfc6455). For connection setup, see [Gateway API](https://docs.discord.com/developers/events/gateway#connections).


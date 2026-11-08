# Gateway
Context: Discord developer reference: Gateway
[Source](connection-lifecycle-index.md) / [Following source section](gateway-events.md)
<a id="source-gateway-part-1"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Gateway API connections let apps use secure WebSocket connections with Discord and receive events for server or guild activity, such as channel updates or role creation. Apps also use Gateway connections in a few cases to request or update resources, such as updating voice state. For most resource operations, use the [HTTP API](https://docs.discord.com/developers/reference#http-api) instead of the Gateway API. The Gateway is Discord's real-time communication channel for clients, including apps, so it includes behavior and data that may not matter to app developers. Gateway work is complex, and [community-built libraries](https://docs.discord.com/developers/developer-tools/community-resources#libraries) can handle much of the difficult logic. If you build a custom implementation, read this documentation end to end so the relevant Gateway details are understood.


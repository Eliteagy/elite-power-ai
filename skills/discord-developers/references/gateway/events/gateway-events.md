# Gateway events
Context: Discord developer reference: Gateway events
[Source](identify-ready-and-guild-events-index.md) / [Following source section](event-names.md)
<a id="source-gateway-events-part-1"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Gateway connections use WebSockets; each WebSocket supports bidirectional communication, so either endpoint may send events. The event set falls into two categories:
- **Send events** are Gateway events an app transmits to Discord, such as identifying with the Gateway.
- **Receive events** are Gateway events Discord delivers to an app. They usually describe activity in a server where the app is installed, such as a channel update.
 Every Gateway event is wrapped in a [Gateway event payload](https://docs.discord.com/developers/events/gateway-events#payload-structure). See the [Gateway documentation](https://docs.discord.com/developers/events/gateway) for details on working with the Gateway. Fields not documented for Gateway events should be treated as unsupported for apps, and their format or data can change without notice.


# Sending events
Context: Discord developer reference: Sending events
[Source](connection-lifecycle-index.md) / [Previous source section](gateway-events.md) / [Following source section](receiving-events.md)
<a id="source-sending-events"></a>

### Sending Events

 When an app sends a Gateway event, such as during [performing an initial handshake](https://docs.discord.com/developers/events/gateway-events#identify) or [updating presence](https://docs.discord.com/developers/events/gateway-events#update-presence), it must send an [event payload object](https://docs.discord.com/developers/events/gateway-events#payload-structure) containing a valid opcode (`op`) and inner data object (`d`). Sent events have specific rate limits described in [Rate Limiting](https://docs.discord.com/developers/events/gateway#rate-limiting). Gateway event payloads sent over a connection:
1. Must be serialized as [plain-text JSON or binary ETF](https://docs.discord.com/developers/events/gateway#encoding-and-compression).
2. Must be no larger than 4096 bytes. If a payload exceeds 4096 bytes, Discord closes the connection with close event code [`4002`](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes).
 See [Gateway event documentation](https://docs.discord.com/developers/events/gateway-events#send-events) for every event an app can send on a connection.


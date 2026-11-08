# Connection lifecycle
Context: Discord developer reference: Connection lifecycle
[Source](connection-lifecycle-index.md) / [Previous source section](connections.md) / [Following source section](connecting.md)
<a id="source-connection-lifecycle"></a>

### Connection Lifecycle

 The overview below omits some nuances; the sections that follow describe each step and event in detail. The Gateway connection sequence is summarized here: (Figure: Gateway connection lifecycle overview)
1. The app fetches and caches a WSS URL with [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) or [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot), then opens a Gateway connection.
2. Discord sends [Hello (opcode `10`)](https://docs.discord.com/developers/events/gateway#hello-event), which includes the heartbeat interval in milliseconds. **Read the section on [Connecting](https://docs.discord.com/developers/events/gateway#connecting)**
3. Begin the Heartbeat interval. The app sends a [Heartbeat (opcode `1`)](https://docs.discord.com/developers/events/gateway-events#heartbeat) event and continues sending heartbeats at each interval until the connection closes. **Read the section on [Sending Heartbeats](https://docs.discord.com/developers/events/gateway#sending-heartbeats)**
  - Discord replies to each Heartbeat with [Heartbeat ACK (opcode `11`)](https://docs.discord.com/developers/events/gateway#sending-heartbeats). If no Heartbeat ACK arrives, the app should close the connection, reconnect, and continue appropriately.
  - Discord can also send the app a [Heartbeat (opcode `1`)](https://docs.discord.com/developers/events/gateway-events#heartbeat) event; the app should answer with a Heartbeat immediately.

4. The app sends [Identify (opcode `2`)](https://docs.discord.com/developers/events/gateway-events#identify) to complete the initial Gateway handshake. **Read the section on [Identifying](https://docs.discord.com/developers/events/gateway#identifying)**
5. Discord sends [Ready (opcode `0`)](https://docs.discord.com/developers/events/gateway-events#ready), confirming that the handshake succeeded and the connection is established. Ready includes `resume_gateway_url`, which the app should store as the WebSocket URL for Resume. **Read the section on [the Ready event](https://docs.discord.com/developers/events/gateway#ready-event)**
6. The connection can drop at any time for many reasons. Whether the app can [Resume](https://docs.discord.com/developers/events/gateway#resuming) or must identify again depends on factors such as the received [opcode](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-opcodes) and [close code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes). **Read the section on [Disconnecting](https://docs.discord.com/developers/events/gateway#disconnecting)**
7. If the app **can** resume or reconnect, it opens a new connection using `resume_gateway_url` with matching version and encoding, then sends [Resume (opcode `6`)](https://docs.discord.com/developers/events/gateway-events#resume). If it **cannot** resume or reconnect, it opens a new connection from the cached URL in step #1 and repeats the Gateway cycle. *Yipee!* **Read the section on [Resuming](https://docs.discord.com/developers/events/gateway#resuming)**


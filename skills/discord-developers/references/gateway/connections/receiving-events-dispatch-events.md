# Receiving events dispatch events
Context: Discord developer reference: Receiving events dispatch events
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](receiving-events.md) / [Following source section](connections.md)
<a id="source-dispatch-events"></a>

#### Dispatch Events

 [Dispatch (opcode `0`)](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-opcodes) is the event type apps receive most often. Most Gateway events representing guild actions arrive as Dispatch events. When parsing one:
- Use the `t` field to identify which [Gateway event](https://docs.discord.com/developers/events/gateway-events#receive-events) the payload contains and what data should appear in `d`.
- The `s` field is the event sequence number, representing relative event order. Cache the latest non-null `s` value for heartbeats and for [Resuming](https://docs.discord.com/developers/events/gateway#resuming) a connection.


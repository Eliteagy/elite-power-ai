# Gateway events
Context: Discord developer reference: Gateway events
[Source](connection-lifecycle-index.md) / [Previous source section](gateway.md) / [Following source section](sending-events.md)
<a id="source-gateway-events"></a> <a id="source-example-gateway-event"></a>

### Gateway Events

 Gateway events are [payloads](https://docs.discord.com/developers/events/gateway-events#payload-structure) transmitted over a [Gateway connection](https://docs.discord.com/developers/events/gateway#connections) in either direction between an app and Discord. Apps usually [*send* events](https://docs.discord.com/developers/events/gateway#sending-events) while establishing and managing the Gateway connection, and [*receive* events](https://docs.discord.com/developers/events/gateway#receiving-events) while observing server activity. Every Gateway event is wrapped in a [Gateway event payload](https://docs.discord.com/developers/events/gateway-events#payload-structure). The [Gateway events documentation](https://docs.discord.com/developers/events/gateway-events) lists all events and their details.

###### Example Gateway Event

```
{
  "op": 0,
  "d": {},
  "s": 42,
  "t": "GATEWAY_EVENT_NAME"
}

```

 See the [Gateway events documentation](https://docs.discord.com/developers/events/gateway-events#payload-structure) for Gateway event payload details.


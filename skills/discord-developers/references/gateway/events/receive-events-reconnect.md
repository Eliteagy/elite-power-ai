# Receive events reconnect
Context: Discord developer reference: Receive events reconnect
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](receive-events.md) / [Previous source section](receive-events-resumed.md) / [Following source section](receive-events-invalid-session.md)
<a id="source-reconnect"></a> <a id="source-example-gateway-reconnect"></a>

#### Reconnect

 The reconnect event tells a client to reconnect to the gateway and resume an existing session when available. It may arrive at any stage of the gateway connection lifecycle, including before or instead of a [Hello](https://docs.discord.com/developers/events/gateway-events#hello) event. The server may close the connection a few seconds after dispatching reconnect.

###### Example Gateway Reconnect

```
{
  "op": 7,
  "d": null
}

```


# Send events heartbeat
Context: Discord developer reference: Send events heartbeat
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](send-events.md) / [Previous source section](send-events-resume.md) / [Following source section](request-guild-members.md)
<a id="source-heartbeat"></a> <a id="source-example-heartbeat"></a>

#### Heartbeat

 Keeps the gateway connection active. Send it every `heartbeat_interval` milliseconds after receiving the [Opcode 10 Hello](https://docs.discord.com/developers/events/gateway-events#hello) payload. The nested `d` value is the most recent sequence number, `s`, received by the client; send `null` if no sequence number has arrived yet. Heartbeat behavior is described in the [Gateway documentation](https://docs.discord.com/developers/events/gateway#sending-heartbeats).

###### Example Heartbeat

```
{
  "op": 1,
  "d": 251
}

```


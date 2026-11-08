# Connecting hello event
Context: Discord developer reference: Connecting hello event
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](connecting.md) / [Following source section](sending-heartbeats.md)
<a id="source-hello-event"></a> <a id="source-example-hello-event"></a>

#### Hello Event

 After connecting to the Gateway, the app receives [Hello (opcode `10`)](https://docs.discord.com/developers/events/gateway#hello-event) with the connection's heartbeat interval (`heartbeat_interval`). This interval is the number of milliseconds used to schedule Heartbeat events that keep the connection active. Heartbeat behavior is described in [Sending Heartbeats](https://docs.discord.com/developers/events/gateway#sending-heartbeats).

###### Example Hello Event

```
{
  "op": 10,
  "d": {
    "heartbeat_interval": 45000
  }
}

```


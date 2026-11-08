# Sending heartbeats heartbeat interval
Context: Discord developer reference: Sending heartbeats heartbeat interval
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](sending-heartbeats.md) / [Following source section](sending-heartbeats-heartbeat-requests.md)
<a id="source-heartbeat-interval"></a> <a id="source-example-heartbeat-ack"></a>

#### Heartbeat Interval

 When the app opens a Gateway connection, [Hello (opcode `10`)](https://docs.discord.com/developers/events/gateway#hello-event) provides `heartbeat_interval`, a millisecond duration. After Hello, wait `heartbeat_interval * jitter`, where `jitter` is a random value from 0 to 1, then send the first [Heartbeat (opcode `1`)](https://docs.discord.com/developers/events/gateway-events#heartbeat). Continue sending a heartbeat every `heartbeat_interval` milliseconds until the connection closes. If the app misses the heartbeat deadline, Discord closes the connection and the app must [Resume](https://docs.discord.com/developers/events/gateway#resuming). Each heartbeat must include the latest sequence number received in the `d` field. That sequence number appears in `s` on the [event payload](https://docs.discord.com/developers/events/gateway-events#payload-structure). If no event has been received, send `null` in `d`. The first heartbeat's `jitter` spreads clients over the interval from 0 to `heartbeat_interval` to avoid mass reconnect traffic. Heartbeats may be sent before `heartbeat_interval` elapses, but avoid doing so unless required. `heartbeat_interval` already includes tolerance for network latency, so no extra latency adjustment is needed. Discord answers each Heartbeat with [Heartbeat ACK (opcode `11`)](https://docs.discord.com/developers/events/gateway#heartbeat-interval-example-heartbeat-ack):

###### Example Heartbeat ACK

```
{
  "op": 11
}

```

 During a service outage where the app remains connected to the Gateway, keep sending heartbeats and receiving heartbeat ACKs. The Gateway eventually responds and issues a session when able. If a client sends a heartbeat and does not receive an ACK before the next send attempt, the connection may have failed or become "zombied." The client should immediately close the connection with any close code except `1000` or `1001`, then reconnect and try to [Resume](https://docs.discord.com/developers/events/gateway#resuming).


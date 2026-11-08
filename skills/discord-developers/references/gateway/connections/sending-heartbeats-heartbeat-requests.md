# Sending heartbeats heartbeat requests
Context: Discord developer reference: Sending heartbeats heartbeat requests
[Source](connection-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](sending-heartbeats.md) / [Previous source section](sending-heartbeats-heartbeat-interval.md) / [Following source section](identifying.md)
<a id="source-heartbeat-requests"></a>

#### Heartbeat Requests

 Discord may request extra heartbeats by sending [Heartbeat (opcode `1`)](https://docs.discord.com/developers/events/gateway-events#heartbeat) in addition to the normal interval. When that event arrives, send a Heartbeat immediately rather than waiting for the current interval to finish. Discord responds with [Heartbeat ACK (opcode `11`)](https://docs.discord.com/developers/events/gateway#heartbeat-interval-example-heartbeat-ack), just as it does for interval heartbeats.


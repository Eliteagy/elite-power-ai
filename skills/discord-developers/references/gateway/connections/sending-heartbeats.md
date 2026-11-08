# Sending heartbeats
Context: Discord developer reference: Sending heartbeats
[Source](connection-lifecycle-index.md) / [Previous source section](connecting-hello-event.md) / [Following source section](sending-heartbeats-heartbeat-interval.md)
<a id="source-sending-heartbeats"></a>

### Sending Heartbeats

 Heartbeats are pings that indicate to Discord that the app is still using a Gateway connection. After the connection opens, the app should send heartbeats in a background process as described below until the Gateway connection closes.


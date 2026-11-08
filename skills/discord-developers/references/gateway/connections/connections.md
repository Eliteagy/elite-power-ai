# Connections
Context: Discord developer reference: Connections
[Source](connection-lifecycle-index.md) / [Previous source section](receiving-events-dispatch-events.md) / [Following source section](connection-lifecycle.md)
<a id="source-connections"></a>

### Connections

 Gateway connections are long-lived WebSockets and are more complex than HTTP requests or interaction responses such as Slash Commands. Apps using the Gateway must open the initial connection, keep it alive, and respond correctly to disconnects.


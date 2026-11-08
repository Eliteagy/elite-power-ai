# Receive events hello
Context: Discord developer reference: Receive events hello
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](receive-events.md) / [Following source section](receive-events-ready.md)
<a id="source-hello"></a> <a id="source-hello-structure"></a> <a id="source-example-hello"></a>

#### Hello

 Sent when the websocket connection opens. It supplies the heartbeat interval the app should use.

###### Hello Structure

| Field | Type | Description |
| --- | --- | --- |
| heartbeat_interval | integer | Interval in milliseconds for app heartbeats |

###### Example Hello

```
{
  "op": 10,
  "d": {
    "heartbeat_interval": 45000
  }
}

```


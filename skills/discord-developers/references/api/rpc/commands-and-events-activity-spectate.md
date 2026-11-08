# Commands and events activity spectate
Context: Discord developer reference: Commands and events activity spectate
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-activity-join.md) / [Following source section](activity-join-request.md)
<a id="source-activity_spectate"></a> <a id="source-activity-spectate-dispatch-data-structure"></a> <a id="source-example-activity-spectate-dispatch-payload"></a>

#### ACTIVITY_SPECTATE

 No arguments

###### Activity Spectate Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| secret | string | the `spectate_secret` for the given invite |

###### Example Activity Spectate Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "secret": "e7eb30d2ee025ed05c71ea495f770b76454ee4e0"
  },
  "evt": "ACTIVITY_SPECTATE"
}

```


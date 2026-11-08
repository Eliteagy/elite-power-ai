# Commands and events activity join
Context: Discord developer reference: Commands and events activity join
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-notification-create.md) / [Following source section](commands-and-events-activity-spectate.md)
<a id="source-activity_join"></a> <a id="source-activity-join-dispatch-data-structure"></a> <a id="source-example-activity-join-dispatch-payload"></a>

#### ACTIVITY_JOIN

 No arguments

###### Activity Join Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| secret | string | the `join_secret` for the given invite |

###### Example Activity Join Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "secret": "025ed05c71f639de8bfaa0d679d7c94b2fdce12f"
  },
  "evt": "ACTIVITY_JOIN"
}

```


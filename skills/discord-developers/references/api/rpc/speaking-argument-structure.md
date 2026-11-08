# Speaking argument structure
Context: Discord developer reference: Speaking argument structure
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](message-create-message-update-message-delete.md) / [Following source section](commands-and-events-notification-create.md)
<a id="source-speaking_startspeaking_stop"></a> <a id="source-speaking-argument-structure"></a> <a id="source-speaking-dispatch-data-structure"></a> <a id="source-example-speaking-dispatch-payload"></a>

#### SPEAKING_START/SPEAKING_STOP

###### Speaking Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | channel id to subscribe to for updates |

###### Speaking Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| user_id | string | id of the user who began or stopped speaking |

###### Example Speaking Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "user_id": "190320984123768832"
  },
  "evt": "SPEAKING_STOP"
}

```


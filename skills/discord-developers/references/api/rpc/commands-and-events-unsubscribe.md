# Commands and events unsubscribe
Context: Discord developer reference: Commands and events unsubscribe
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-subscribe.md) / [Following source section](set-certified-devices.md)
<a id="source-unsubscribe"></a> <a id="source-unsubscribe-response-structure"></a> <a id="source-example-unsubscribe-command-payload"></a> <a id="source-example-unsubscribe-response-payload"></a>

#### UNSUBSCRIBE

 Unsubscribes from events. Set payload `evt` to the event that was previously subscribed to, and set `args` to the arguments used for that subscription.

###### Unsubscribe Response Structure

| Field | Type | Description |
| --- | --- | --- |
| evt | string | event name now unsubscribed from |

###### Example Unsubscribe Command Payload

```
{
  "nonce": "647d814a-4cf8-4fbb-948f-898aad24f55b",
  "args": {
    "guild_id": "199737254929760256"
  },
  "evt": "GUILD_STATUS",
  "cmd": "UNSUBSCRIBE"
}

```

###### Example Unsubscribe Response Payload

```
{
  "cmd": "UNSUBSCRIBE",
  "data": {
    "evt": "GUILD_STATUS"
  },
  "nonce": "647d814a-4cf8-4fbb-948f-898aad24f55b"
}

```


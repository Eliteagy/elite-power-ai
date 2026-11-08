# Commands and events subscribe
Context: Discord developer reference: Commands and events subscribe
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](example-set-voice-settings-response-payload.md) / [Following source section](commands-and-events-unsubscribe.md)
<a id="source-subscribe"></a> <a id="source-subscribe-response-structure"></a> <a id="source-example-subscribe-command-payload"></a> <a id="source-example-subscribe-response-payload"></a>

#### SUBSCRIBE

 Subscribes to events. Set payload `evt` to the event name and payload `args` to the arguments required for that event.

###### Subscribe Response Structure

| Field | Type | Description |
| --- | --- | --- |
| evt | string | event name now subscribed to |

###### Example Subscribe Command Payload

```
{
  "nonce": "be9a6de3-31d0-4767-a8e9-4818c5690015",
  "args": {
    "guild_id": "199737254929760256"
  },
  "evt": "GUILD_STATUS",
  "cmd": "SUBSCRIBE"
}

```

###### Example Subscribe Response Payload

```
{
  "cmd": "SUBSCRIBE",
  "data": {
    "evt": "GUILD_STATUS"
  },
  "nonce": "be9a6de3-31d0-4767-a8e9-4818c5690015"
}

```


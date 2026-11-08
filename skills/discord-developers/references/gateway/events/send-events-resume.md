# Send events resume
Context: Discord developer reference: Send events resume
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](send-events.md) / [Previous source section](send-events-identify.md) / [Following source section](send-events-heartbeat.md)
<a id="source-resume"></a> <a id="source-resume-structure"></a> <a id="source-example-resume"></a>

#### Resume

 Replays events missed by a disconnected client that is resuming. The [Gateway documentation](https://docs.discord.com/developers/events/gateway#resuming) explains resume behavior.

###### Resume Structure

| Field | Type | Description |
| --- | --- | --- |
| token | string | Session token |
| session_id | string | Session ID |
| seq | integer | Last sequence number received |

###### Example Resume

```
{
  "op": 6,
  "d": {
    "token": "randomstring",
    "session_id": "evenmorerandomstring",
    "seq": 1337
  }
}

```


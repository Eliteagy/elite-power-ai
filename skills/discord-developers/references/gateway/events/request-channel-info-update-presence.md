# Request channel info update presence
Context: Discord developer reference: Request channel info update presence
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](request-channel-info.md) / [Previous source section](update-voice-state.md) / [Following source section](receive-events.md)
<a id="source-update-presence"></a> <a id="source-gateway-presence-update-structure"></a> <a id="source-status-types"></a> <a id="source-example-gateway-presence-update"></a>

#### Update Presence

 Sent by the client to report a presence or status change.

###### Gateway Presence Update Structure

| Field | Type | Description |
| --- | --- | --- |
| since | ?integer | Unix time in milliseconds when the client became idle, or null when the client is active |
| activities | array of activity objects | User’s activities |
| status | string | User’s new status |
| afk | boolean | Whether the client is afk |

###### Status Types

| Status | Description |
| --- | --- |
| online | Online |
| dnd | Do Not Disturb |
| idle | AFK |
| invisible | Invisible and shown as offline |
| offline | Offline |

###### Example Gateway Presence Update

```
{
  "op": 3,
  "d": {
    "since": 91879201,
    "activities": [{
      "name": "Save the Oxford Comma",
      "type": 0
    }],
    "status": "online",
    "afk": false
  }
}

```


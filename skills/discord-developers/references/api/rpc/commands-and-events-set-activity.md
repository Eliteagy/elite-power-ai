# Commands and events set activity
Context: Discord developer reference: Commands and events set activity
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](example-set-certified-devices-response-payload.md) / [Following source section](send-activity-join-invite.md)
<a id="source-set_activity"></a> <a id="source-set-activity-argument-structure"></a> <a id="source-example-set-activity-payload"></a>

#### SET_ACTIVITY

 Updates a user's Rich Presence.

###### Set Activity Argument Structure

 When using `SET_ACTIVITY`, the `activity` object can only use `type` values Playing (`0`), Listening (`2`), Watching (`3`), or Competing (`5`).
| Field | Type | Description |
| --- | --- | --- |
| pid | integer | the application’s process id |
| activity | activity object | rich presence to set for the user |

###### Example Set Activity Payload

```
{
  "cmd": "SET_ACTIVITY",
  "args": {
    "pid": 9999,
    "activity": {
      "state": "In a Group",
      "state_url": "https://example.com/groups/50335231-9d9d-4ebd-873b-984787ee4d1d",
      "details": "Competitive | In a Match",
      "details_url": "https://example.com/matches/42340203-2f25-4534-8ff6-2a6509e81207",
      "timestamps": {
        "start": time(nullptr),
        "end": time(nullptr) + (60 * 5 + 23)
      },
      "assets": {
        "large_image": "numbani_map",
        "large_text": "Numbani",
        "large_url": "https://example.wiki/maps/Numbani",
        "small_image": "pharah_profile",
        "small_text": "Pharah",
        "small_url": "https://example.wiki/characters/Pharah"
      },
      "party": {
        "id": GameEngine.GetPartyId(),
        "size": [3, 6]
      },
      "secrets": {
        "join": "025ed05c71f639de8bfaa0d679d7c94b2fdce12f",
        "spectate": "e7eb30d2ee025ed05c71ea495f770b76454ee4e0",
        "match": "4b2fdce12f639de8bfa7e3591b71a0d679d7c93f"
      },
      "instance": true
    }
  },
  "nonce": "647d814a-4cf8-4fbb-948f-898abd24f55b"
}

```


# Commands and events activity invite
Context: Discord developer reference: Commands and events activity invite
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](activity-join-request.md) / [Following source section](current-user-update.md)
<a id="source-activity_invite"></a> <a id="source-activity-invite-dispatch-data-structure"></a> <a id="source-example-activity-invite-dispatch-payload"></a>

#### ACTIVITY_INVITE

 No arguments

###### Activity Invite Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | invite type; `1` for join |
| user | partial user object | user who sent the invite |
| activity | activity object | activity tied to the invite |
| channel_id | string | id of the channel where the invite was sent |
| message_id | string | id of the invite message |

###### Example Activity Invite Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "type": 1,
    "user": {
      "id": "53908232506183680",
      "username": "Mason",
      "discriminator": "1337",
      "avatar": "a_bab14f271d565501444b2ca3be944b25"
    },
    "activity": {
      "application_id": "192741864418312192",
      "name": "My Game",
      "party": {
        "id": "party1234",
        "size": [2, 5]
      }
    },
    "channel_id": "199737254929760256",
    "message_id": "199743874640379904"
  },
  "evt": "ACTIVITY_INVITE"
}

```


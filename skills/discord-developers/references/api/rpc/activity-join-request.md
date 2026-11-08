# Activity join request
Context: Discord developer reference: Activity join request
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-activity-spectate.md) / [Following source section](commands-and-events-activity-invite.md)
<a id="source-activity_join_request"></a> <a id="source-activity-join-request-data-structure"></a> <a id="source-example-activity-join-request-dispatch-payload"></a>

#### ACTIVITY_JOIN_REQUEST

 No arguments

###### Activity Join Request Data Structure

| Field | Type | Description |
| --- | --- | --- |
| user | partial user object | details about the user asking to join |

###### Example Activity Join Request Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "user": {
      "id": "53908232506183680",
      "username": "Mason",
      "discriminator": "1337",
      "avatar": "a_bab14f271d565501444b2ca3be944b25"
    }
  },
  "evt": "ACTIVITY_JOIN_REQUEST"
}

```


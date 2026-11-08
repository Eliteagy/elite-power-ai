# Send activity join invite
Context: Discord developer reference: Send activity join invite
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-set-activity.md) / [Following source section](close-activity-request.md)
<a id="source-send_activity_join_invite"></a> <a id="source-send-activity-join-invite-argument-structure"></a> <a id="source-example-send-activity-join-invite-payload"></a>

#### SEND_ACTIVITY_JOIN_INVITE

 Accepts an Ask to Join request.

###### Send Activity Join Invite Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| user_id | snowflake | id of the user who sent the request |

###### Example Send Activity Join Invite Payload

```
{
  "nonce": "5dc0c062-98c6-47a0-8922-15aerg126",
  "cmd": "SEND_ACTIVITY_JOIN_INVITE",
  "args": {
    "user_id": "53908232506183680"
  }
}

```


# Close activity request
Context: Discord developer reference: Close activity request
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](send-activity-join-invite.md) / [Following source section](ready-dispatch-data-structure.md)
<a id="source-close_activity_request"></a> <a id="source-close-activity-request-argument-structure"></a> <a id="source-example-close-activity-request-payload"></a>

#### CLOSE_ACTIVITY_REQUEST

 Rejects an Ask to Join request.

###### Close Activity Request Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| user_id | snowflake | id of the user who sent the request |

###### Example Close Activity Request Payload

```
{
  "nonce": "5dc0c062-98c6-47a0-8922-15aerg126",
  "cmd": "CLOSE_ACTIVITY_REQUEST",
  "args": {
    "user_id": "53908232506183680"
  }
}

```


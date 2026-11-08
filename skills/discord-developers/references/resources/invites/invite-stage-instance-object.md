# Invite stage instance object
Context: Discord developer reference: Invite stage instance object
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](invite-metadata-object.md) / [Following source section](invite-object-get-invite.md)
<a id="source-invite-stage-instance-object"></a> <a id="source-invite-stage-instance-structure"></a> <a id="source-example-invite-stage-instance"></a>

### Invite Stage Instance Object

 This is deprecated.

###### Invite Stage Instance Structure

| Field | Type | Description |
| --- | --- | --- |
| members | array of partial guild member objects | members currently speaking in the Stage |
| participant_count | integer | user count in the Stage |
| speaker_count | integer | count of users currently speaking in the Stage |
| topic | string | Stage instance topic (1-120 characters) |

###### Example Invite Stage Instance

```
{
  "topic": "The debate is over: diet is better than regular",
  "participant_count": 200,
  "speaker_count": 5 ,
  "members": [
    {
      "roles": [],
      "nick": "NOT API SUPPORT",
      "avatar": null,
      "premium_since": null,
      "joined_at": "2015-04-26T06:26:56.936000+00:00",
      "pending": false,
      "user": {}
    }
  ]
}

```


# Voice state object
Context: Discord developer reference: Voice state object
[Source](../../resources/users-and-voice-index.md) / [Previous source section](../../resources/users/delete-current-user-application-role-connection.md) / [Following source section](voice-region-structure.md)
<a id="source-voice-state-object"></a> <a id="source-voice-state-object-1"></a> <a id="source-voice-state-structure"></a> <a id="source-example-voice-state"></a>

## Voice State Object

### Voice State Object

 Represents a user's voice connection status.

###### Voice State Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id? | snowflake | the guild id for this voice state |
| channel_id | ?snowflake | the channel id the user is connected to |
| user_id | snowflake | the user id for this voice state |
| member? | guild member object | the guild member tied to this voice state |
| session_id | string | the session id associated with this voice state |
| deaf | boolean | whether the server deafened this user |
| mute | boolean | whether the server muted this user |
| self_deaf | boolean | whether this user deafened locally |
| self_mute | boolean | whether this user muted locally |
| self_stream? | boolean | whether this user is streaming with "Go Live" |
| self_video | boolean | whether this user's camera is enabled |
| suppress | boolean | whether this user's permission to speak is denied |
| request_to_speak_timestamp | ?ISO8601 timestamp | when the user requested to speak |

###### Example Voice State

```
{
  "channel_id": "157733188964188161",
  "user_id": "80351110224678912",
  "session_id": "90326bd25d71d39b9ef95b299e3872ff",
  "deaf": false,
  "mute": false,
  "self_deaf": false,
  "self_mute": true,
  "suppress": false,
  "request_to_speak_timestamp": "2021-03-31T18:45:31.297561+00:00"
}

```


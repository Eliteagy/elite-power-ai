# Modify current user voice state
Context: Discord developer reference: Modify current user voice state
[Source](../../resources/users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](voice-state-object.md) / [Previous source section](get-user-voice-state.md) / [Following source section](modify-user-voice-state.md)
<a id="source-modify-current-user-voice-state"></a> <a id="source-json-params-4"></a> <a id="source-caveats"></a>

### Modify Current User Voice State

  Updates the current user's voice state. On success, returns `204 No Content` and fires a [Voice State Update](https://docs.discord.com/developers/events/gateway-events#voice-state-update) Gateway event.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| channel_id? | snowflake | the id of the channel the user is currently in |
| suppress? | boolean | toggles the user's suppress state |
| request_to_speak_timestamp? | ?ISO8601 timestamp | sets the user's request to speak |

###### Caveats

 Current caveats for this endpoint:
- `channel_id` must point to a stage channel.
- The current user must already be joined to `channel_id`.
- You need the `MUTE_MEMBERS` permission to unsuppress yourself. You can always suppress yourself.
- You need the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your own request to speak.
- `request_to_speak_timestamp` may be set to any present or future time.


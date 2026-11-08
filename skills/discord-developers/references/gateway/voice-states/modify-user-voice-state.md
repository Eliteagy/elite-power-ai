# Modify user voice state
Context: Discord developer reference: Modify user voice state
[Source](../../resources/users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](voice-state-object.md) / [Previous source section](modify-current-user-voice-state.md)
<a id="source-modify-user-voice-state"></a> <a id="source-json-params-5"></a> <a id="source-caveats-1"></a>

### Modify User Voice State

  Updates another user's voice state. On success, returns `204 No Content` and fires a [Voice State Update](https://docs.discord.com/developers/events/gateway-events#voice-state-update) Gateway event.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| channel_id? | snowflake | the id of the channel the user is currently in |
| suppress? | boolean | toggles the user's suppress state |

###### Caveats

 Current caveats for this endpoint:
- `channel_id` must point to a stage channel.
- The user must already be joined to `channel_id`.
- You need the `MUTE_MEMBERS` permission, because suppression is currently the only available operation.
- When unsuppressed, non-bot users get `request_to_speak_timestamp` set to the current time. Bot users do not.
- When suppressed, the user's `request_to_speak_timestamp` is removed.

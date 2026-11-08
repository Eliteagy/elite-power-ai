# Voice channel effect send
Context: Discord developer reference: Voice channel effect send
[Source](reaction-presence-and-user-events-index.md) / [Previous source section](presence-user-update.md) / [Following source section](voice-state-update.md)
<a id="source-voice"></a> <a id="source-voice-channel-effect-send"></a> <a id="source-voice-channel-effect-send-event-fields"></a> <a id="source-animation-types"></a>

### Voice

#### Voice Channel Effect Send

 Emitted when someone sends an effect, for example an emoji reaction or soundboard sound, in a voice channel joined by the current user.

###### Voice Channel Effect Send Event Fields

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | ID for the channel where the effect was sent. |
| guild_id | snowflake | ID for the guild where the effect was sent. |
| user_id | snowflake | ID for the user who sent the effect. |
| emoji? | ?emoji object | Emoji payload for emoji reaction and soundboard effects. |
| animation_type? | ?integer | Emoji animation type for emoji reaction and soundboard effects. |
| animation_id? | integer | Emoji animation ID for emoji reaction and soundboard effects. |
| sound_id? | snowflake or integer | Soundboard sound ID for soundboard effects. |
| sound_volume? | double | Soundboard sound volume, from 0 to 1, for soundboard effects. |

###### Animation Types

| Type | Value | Description |
| --- | --- | --- |
| PREMIUM | 0 | A playful animation sent by a Nitro subscriber. |
| BASIC | 1 | The standard animation |


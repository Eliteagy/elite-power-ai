# Send soundboard sound
Context: Discord developer reference: Send soundboard sound
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](soundboard-sound-object.md) / [Previous source section](soundboard-sound-object-sound-files.md) / [Following source section](list-default-soundboard-sounds.md)
<a id="source-send-soundboard-sound"></a> <a id="source-json-params"></a>

### Send Soundboard Sound

  Plays a soundboard sound in a voice channel where the user is connected. This emits Gateway event [Voice Channel Effect Send](https://docs.discord.com/developers/events/gateway-events#voice-channel-effect-send). Requires `SPEAK` and `USE_SOUNDBOARD`; for sounds from another server, `USE_EXTERNAL_SOUNDS` is required too. The user must be connected to the voice channel with a [voice state](https://docs.discord.com/developers/resources/voice#voice-state-object) where `deaf`, `self_deaf`, `mute`, and `suppress` are disabled.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| sound_id | snowflake | soundboard sound id to play |
| source_guild_id? | snowflake | guild id that owns the soundboard sound; required for sounds from other servers |


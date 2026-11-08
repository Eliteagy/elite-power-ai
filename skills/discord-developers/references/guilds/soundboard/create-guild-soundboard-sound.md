# Create guild soundboard sound
Context: Discord developer reference: Create guild soundboard sound
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](soundboard-sound-object.md) / [Previous source section](get-guild-soundboard-sound.md) / [Following source section](modify-guild-soundboard-sound.md)
<a id="source-create-guild-soundboard-sound"></a> <a id="source-json"></a> <a id="source-json-params-1"></a>

### Create Guild Soundboard Sound

  Creates a guild soundboard sound. Requires `CREATE_GUILD_EXPRESSIONS`. On success, returns the created [soundboard sound](https://docs.discord.com/developers/resources/soundboard#soundboard-sound-object) object; Discord emits Gateway event [Guild Soundboard Sound Create](https://docs.discord.com/developers/events/gateway-events#guild-soundboard-sound-create). Uploads for soundboard sounds are limited to 512kb and 5.2 seconds. This endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | soundboard sound name (2-32 characters) |
| sound | data uri | base64-encoded mp3 or ogg sound data, similar to image data |
| volume? | ?double | soundboard sound volume; valid range 0 to 1 and default 1 |
| emoji_id? | ?snowflake | custom emoji id for the soundboard sound |
| emoji_name? | ?string | standard emoji unicode character for the soundboard sound |


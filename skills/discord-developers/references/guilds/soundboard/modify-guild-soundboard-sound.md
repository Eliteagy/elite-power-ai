# Modify guild soundboard sound
Context: Discord developer reference: Modify guild soundboard sound
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](soundboard-sound-object.md) / [Previous source section](create-guild-soundboard-sound.md) / [Following source section](delete-guild-soundboard-sound.md)
<a id="source-modify-guild-soundboard-sound"></a> <a id="source-json-params-2"></a>

### Modify Guild Soundboard Sound

  Updates an existing soundboard sound. Sounds created by the current user require `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS`; sounds from other users require `MANAGE_GUILD_EXPRESSIONS`. On success, returns the updated [soundboard sound](https://docs.discord.com/developers/resources/soundboard#soundboard-sound-object) object and emits the [Guild Soundboard Sound Update](https://docs.discord.com/developers/events/gateway-events#guild-soundboard-sound-update) Gateway event. Every parameter is optional. This endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | soundboard sound name (2-32 characters) |
| volume | ?double | soundboard sound volume, from 0 to 1 |
| emoji_id | ?snowflake | custom emoji id for the soundboard sound |
| emoji_name | ?string | standard emoji unicode character for the soundboard sound |


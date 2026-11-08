# Delete guild soundboard sound
Context: Discord developer reference: Delete guild soundboard sound
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](soundboard-sound-object.md) / [Previous source section](modify-guild-soundboard-sound.md) / [Following source section](../stage-instances/stage-instance-object.md)
<a id="source-delete-guild-soundboard-sound"></a>

### Delete Guild Soundboard Sound

  Deletes a soundboard sound. Sounds created by the current user require `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS`; sounds from other users require `MANAGE_GUILD_EXPRESSIONS`. Success returns `204 No Content`; Discord emits Gateway event [Guild Soundboard Sound Delete](https://docs.discord.com/developers/events/gateway-events#guild-soundboard-sound-delete). The endpoint accepts the `X-Audit-Log-Reason` header.


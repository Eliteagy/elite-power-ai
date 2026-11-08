# List guild soundboard sounds
Context: Discord developer reference: List guild soundboard sounds
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](soundboard-sound-object.md) / [Previous source section](list-default-soundboard-sounds.md) / [Following source section](get-guild-soundboard-sound.md)
<a id="source-list-guild-soundboard-sounds"></a> <a id="source-response-structure"></a>

### List Guild Soundboard Sounds

  Returns the guild's soundboard sound list. Includes `user` fields when the bot has `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS`.

###### Response Structure

| Field | Type |
| --- | --- |
| items | array of soundboard sound objects |


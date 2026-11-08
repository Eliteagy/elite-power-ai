# Guild widget structure
Context: Discord developer reference: Guild widget structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](guild-widget-settings-structure.md) / [Following source section](guild-member-structure.md)
<a id="source-guild-widget-object"></a> <a id="source-guild-widget-structure"></a> <a id="source-example-guild-widget"></a>

### Guild Widget Object

###### Guild Widget Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | guild id |
| name | string | guild name (2-100 characters) |
| instant_invite | ?string | instant invite for the guilds specified widget invite channel |
| channels | array of partial channel objects | voice and stage channel records which are accessible by @everyone |
| members | array of partial user objects | special widget user object records that includes user accounts presence (Limit 100) |
| presence_count | integer | Count of online member records in this guild |

 The fields `id`, `discriminator` and `avatar` are anonymized to prevent abuse.

###### Example Guild Widget

```
{
  "id": "290926798626999250",
  "name": "Test Server",
  "instant_invite": "https://discord.com/invite/abcdefg",
  "channels": [
    {
      "id": "705216630279993882",
      "name": "elephant",
      "position": 2
    },
    {
      "id": "669583461748992190",
      "name": "groovy-music",
      "position": 1
    }
  ],
  "members": [
    {
      "id": "0",
      "username": "1234",
      "discriminator": "0000",
      "avatar": null,
      "status": "online",
      "avatar_url": "https://cdn.discordapp.com/widget-avatars/FfvURgcr3Za92K3JtoCppqnYMppMDc5B-Rll74YrGCU/C-1DyBZPQ6t5q2RuATFuMFgq0_uEMZVzd_6LbGN_uJKvZflobA9diAlTjhf6CAESLLeTuu4dLuHFWOb_PNLteooNfhC4C6k5QgAGuxEOP12tVVVCvX6t64k14PMXZrGTDq8pWZhukP40Wg"
    }
  ],
  "presence_count": 1
}

```


# Request soundboard sounds
Context: Discord developer reference: Request soundboard sounds
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](send-events.md) / [Previous source section](request-guild-members.md) / [Following source section](request-channel-info.md)
<a id="source-request-soundboard-sounds"></a> <a id="source-request-soundboard-sounds-structure"></a> <a id="source-example-request-soundboard-sounds"></a>

#### Request Soundboard Sounds

 Requests soundboard sounds for a set of guilds. Discord replies with [Soundboard Sounds](https://docs.discord.com/developers/events/gateway-events#soundboard-sounds) events for each guild.

###### Request Soundboard Sounds Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_ids | array of snowflakes | IDs of guilds whose soundboard sounds should be returned |

###### Example Request Soundboard Sounds

```
{
  "op": 31,
  "d": {
    "guild_ids": ["613425648685547541", "81384788765712384"]
  }
}

```


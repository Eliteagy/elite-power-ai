# Request channel info
Context: Discord developer reference: Request channel info
[Source](identify-ready-and-guild-events-index.md) / [Previous source section](request-soundboard-sounds.md) / [Following source section](update-voice-state.md)
<a id="source-request-channel-info"></a> <a id="source-request-channel-info-structure"></a> <a id="source-example-request-channel-info"></a>

### Request Channel Info

 Requests temporary channel data for channels in a guild. Discord responds with a [Channel Info](https://docs.discord.com/developers/events/gateway-events#channel-info) event.

###### Request Channel Info Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | guild id for the channel info request |
| fields | array of strings | Fields to request; currently available values are `status` and `voice_start_time`. |

###### Example Request Channel Info

```
{
  "guild_id": "613425648685547541",
  "fields": ["status", "voice_start_time"]
}

```


# Channels channel info
Context: Discord developer reference: Channels channel info
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](channels-channel-delete.md)
<a id="source-channel-info"></a> <a id="source-channel-info-structure"></a>

#### Channel Info

 Contains temporary data for channels in a guild. It is sent as the response to [Request Channel Info](https://docs.discord.com/developers/events/gateway-events#request-channel-info).

###### Channel Info Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | The guild id |
| channels | array of channel info objects | Temporary data for channels in the guild |

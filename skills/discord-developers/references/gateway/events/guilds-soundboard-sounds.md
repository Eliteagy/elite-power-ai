# Guilds soundboard sounds
Context: Discord developer reference: Guilds soundboard sounds
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-soundboard-sounds-update.md) / [Following source section](integrations-integration-create.md)
<a id="source-soundboard-sounds"></a> <a id="source-soundboard-sounds-event-fields"></a>

#### Soundboard Sounds

 Contains the guild's soundboard sound list. It is dispatched in response to [Request Soundboard Sounds](https://docs.discord.com/developers/events/gateway-events#request-soundboard-sounds).

###### Soundboard Sounds Event Fields

| Field | Type | Description |
| --- | --- | --- |
| soundboard_sounds | array of soundboard sound objects | The guild’s soundboard sounds |
| guild_id | snowflake | ID of the guild |


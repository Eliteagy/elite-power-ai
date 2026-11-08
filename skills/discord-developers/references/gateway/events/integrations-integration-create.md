# Integrations integration create
Context: Discord developer reference: Integrations integration create
[Source](channel-thread-and-message-events-index.md) / [Previous source section](guilds-soundboard-sounds.md) / [Following source section](integrations-integration-update.md)
<a id="source-integrations"></a> <a id="source-integration-create"></a> <a id="source-integration-create-event-additional-fields"></a>

### Integrations

#### Integration Create

 Dispatched after an integration is created. The payload body is an [integration](https://docs.discord.com/developers/resources/guild#integration-object) object with `user` omitted and an added `guild_id` key:

###### Integration Create Event Additional Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |


# Integrations integration update
Context: Discord developer reference: Integrations integration update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](integrations-integration-create.md) / [Following source section](integrations-integration-delete.md)
<a id="source-integration-update"></a> <a id="source-integration-update-event-additional-fields"></a>

#### Integration Update

 Dispatched after an integration is updated. The payload body is an [integration](https://docs.discord.com/developers/resources/guild#integration-object) object with `user` omitted and an added `guild_id` key:

###### Integration Update Event Additional Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |


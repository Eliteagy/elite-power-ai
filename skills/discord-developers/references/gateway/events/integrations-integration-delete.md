# Integrations integration delete
Context: Discord developer reference: Integrations integration delete
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](integrations-integration-create.md) / [Previous source section](integrations-integration-update.md) / [Following source section](invites.md)
<a id="source-integration-delete"></a> <a id="source-integration-delete-event-fields"></a>

#### Integration Delete

 Dispatched after an integration is deleted.

###### Integration Delete Event Fields

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | Integration ID |
| guild_id | snowflake | ID of the guild |
| application_id? | snowflake | ID of the bot/OAuth2 application for this Discord integration |


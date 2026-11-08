# Create guild scheduled event
Context: Discord developer reference: Create guild scheduled event
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](list-scheduled-events-for-guild.md) / [Following source section](get-guild-scheduled-event.md)
<a id="source-create-guild-scheduled-event"></a> <a id="source-json-params"></a>

### Create Guild Scheduled Event

  Creates a guild scheduled event in the guild. On success, returns a [guild scheduled event](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-object) object. Also fires a [Guild Scheduled Event Create](https://docs.discord.com/developers/events/gateway-events#guild-scheduled-event-create) Gateway event. A guild can have no more than 100 events with `SCHEDULED` or `ACTIVE` status at once. This endpoint supports the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| channel_id? * | snowflake * | scheduled event channel id |
| entity_metadata? ** | entity metadata | scheduled event entity metadata |
| name | string | scheduled event name |
| privacy_level | privacy level | scheduled event privacy level |
| scheduled_start_time | ISO8601 timestamp | time when the scheduled event should start |
| scheduled_end_time? ** | ISO8601 timestamp | time when the scheduled event should end |
| description? | string | scheduled event description |
| entity_type | entity type | scheduled event entity type |
| image? | image data | scheduled event cover image |
| recurrence_rule? | recurrence rule | rule that defines how often the event recurs |

 * Optional for events where `'entity_type': EXTERNAL` ** Required for events where `'entity_type': EXTERNAL`


# Modify guild scheduled event
Context: Discord developer reference: Modify guild scheduled event
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](get-guild-scheduled-event.md) / [Following source section](delete-guild-scheduled-event.md)
<a id="source-modify-guild-scheduled-event"></a> <a id="source-json-params-1"></a>

### Modify Guild Scheduled Event

  Updates a guild scheduled event and returns the modified [guild scheduled event](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-object) object on success. It fires a [Guild Scheduled Event Update](https://docs.discord.com/developers/events/gateway-events#guild-scheduled-event-update) Gateway event. To start or end an event, modify the event's [status](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status) field through this endpoint. This endpoint supports the `X-Audit-Log-Reason` header, silently drops `entity_metadata` for non-`EXTERNAL` events, and treats every parameter as optional.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| channel_id? * | ?snowflake | scheduled event channel id; set to `null` when changing entity type to `EXTERNAL` |
| entity_metadata? | ?entity metadata | scheduled event entity metadata |
| name? | string | scheduled event name |
| privacy_level? | privacy level | scheduled event privacy level |
| scheduled_start_time? | ISO8601 timestamp | time when the scheduled event should start |
| scheduled_end_time? * | ISO8601 timestamp | time when the scheduled event should end |
| description? | ?string | scheduled event description |
| entity_type? * | event entity type | scheduled event entity type |
| status? | event status | scheduled event status |
| image? | image data | scheduled event cover image |
| recurrence_rule? | ?recurrence rule | rule that defines how often the event recurs |

 * When updating `entity_type` to `EXTERNAL`:
- `channel_id` is required and [must be null](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-object-field-requirements-by-entity-type)
- Provide `entity_metadata` with a `location` field
- Provide `scheduled_end_time`


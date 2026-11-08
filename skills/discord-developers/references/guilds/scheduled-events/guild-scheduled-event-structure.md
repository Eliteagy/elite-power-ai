# Guild scheduled event structure
Context: Discord developer reference: Guild scheduled event structure
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Following source section](guild-scheduled-event-user-structure.md)
<a id="source-guild-scheduled-event-object-1"></a> <a id="source-guild-scheduled-event-structure"></a> <a id="source-guild-scheduled-event-privacy-level"></a> <a id="source-guild-scheduled-event-entity-types"></a> <a id="source-field-requirements-by-entity-type"></a> <a id="source-guild-scheduled-event-status"></a> <a id="source-valid-guild-scheduled-event-status-transitions"></a> <a id="source-guild-scheduled-event-entity-metadata"></a>

### Guild Scheduled Event Object

###### Guild Scheduled Event Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | scheduled event id |
| guild_id | snowflake | guild id that owns the scheduled event |
| channel_id ** | ?snowflake | channel id where the scheduled event is hosted, or `null` when the scheduled entity type is `EXTERNAL` |
| creator_id? * | ?snowflake | id of the user who created the scheduled event * |
| name | string | scheduled event name (1-100 characters) |
| description? | ?string | scheduled event description (1-1000 characters) |
| scheduled_start_time | ISO8601 timestamp | time when the scheduled event starts |
| scheduled_end_time ** | ?ISO8601 timestamp | time when the scheduled event ends; required when entity_type is `EXTERNAL` |
| privacy_level | privacy level | scheduled event privacy level |
| status | event status | scheduled event status |
| entity_type | scheduled entity type | scheduled event type |
| entity_id | ?snowflake | id of the entity tied to the guild scheduled event |
| entity_metadata ** | ?entity metadata | extra metadata for the guild scheduled event |
| creator? | user object | user who created the scheduled event |
| user_count? | integer | count of users subscribed to the scheduled event |
| image? | ?string | scheduled event cover image hash |
| recurrence_rule | ?recurrence rule | rule that defines how often the event recurs |

 * `creator_id` is null and `creator` is omitted for events created before October 25th, 2021, when `creator_id` was introduced and began being tracked. ** See [field requirements by entity type](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-object-field-requirements-by-entity-type) for how `entity_type` relates to `channel_id`, `entity_metadata`, and `scheduled_end_time`.

###### Guild Scheduled Event Privacy Level

| Level | Value | Description |
| --- | --- | --- |
| GUILD_ONLY | 2 | scheduled event is visible only to guild members |

###### Guild Scheduled Event Entity Types

| Type | Value |
| --- | --- |
| STAGE_INSTANCE | 1 |
| VOICE | 2 |
| EXTERNAL | 3 |

###### Field Requirements By Entity Type

 This table defines requirements by current entity type. `value` means the field must be non-null, `null` means the field must be null, and `-` means there is no strict requirement.
| Entity Type | channel_id | entity_metadata | scheduled_end_time |
| --- | --- | --- | --- |
| STAGE_INSTANCE | value | null | - |
| VOICE | value | null | - |
| EXTERNAL | null | value * | value |

 * Provide `entity_metadata` with a non-null `location`

###### Guild Scheduled Event Status

| Type | Value |
| --- | --- |
| SCHEDULED | 1 |
| ACTIVE | 2 |
| COMPLETED * | 3 |
| CANCELED * | 4 |

 * After `status` becomes `COMPLETED` or `CANCELED`, `status` cannot be updated again

###### Valid Guild Scheduled Event Status Transitions

 SCHEDULED —> ACTIVE ACTIVE --------> COMPLETED SCHEDULED —> CANCELED

###### Guild Scheduled Event Entity Metadata

| Field | Type | Description |
| --- | --- | --- |
| location? * | string | location of the event (1-100 characters) |

 * [required](https://docs.discord.com/developers/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata) for events where `'entity_type': EXTERNAL`


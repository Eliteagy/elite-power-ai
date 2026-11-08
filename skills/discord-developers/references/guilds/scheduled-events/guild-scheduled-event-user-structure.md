# Guild scheduled event user structure
Context: Discord developer reference: Guild scheduled event user structure
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-scheduled-event-object.md) / [Previous source section](guild-scheduled-event-structure.md) / [Following source section](guild-scheduled-event-recurrence-rule-object.md)
<a id="source-guild-scheduled-event-user-object"></a> <a id="source-guild-scheduled-event-user-structure"></a>

### Guild Scheduled Event User Object

###### Guild Scheduled Event User Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_scheduled_event_id | snowflake | scheduled event id the user subscribed to |
| user | user | user subscribed to the event |
| member? | guild member | guild member data for this user in the guild that owns the event, when present |


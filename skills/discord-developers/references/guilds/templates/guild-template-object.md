# Guild template object
Context: Discord developer reference: Guild template object
[Source](../../resources/scheduled-events-and-templates-index.md) / [Previous source section](../scheduled-events/modify-delete-permissions.md) / [Following source section](example-guild-template-object.md)
<a id="source-guild-template-object"></a> <a id="source-guild-template-object-1"></a> <a id="source-guild-template-structure"></a>

## Guild Template Object

### Guild Template Object

 A guild template code creates a guild from a snapshot of an existing guild.

###### Guild Template Structure

| Field | Type | Description |
| --- | --- | --- |
| code | string | the template code (unique ID) |
| name | string | template name |
| description | ?string | the description for the template |
| usage_count | integer | usage count for this template |
| creator_id | snowflake | ID of the user who created the template |
| creator | user object | user who created the template |
| created_at | ISO8601 timestamp | when this template was created |
| updated_at | ISO8601 timestamp | time when this template was last synced to the source guild |
| source_guild_id | snowflake | ID of the guild this template uses as its source |
| serialized_source_guild | partial guild object | guild snapshot stored in the template; placeholder IDs are integers |
| is_dirty | ?boolean | whether the template contains changes that have not been synced |


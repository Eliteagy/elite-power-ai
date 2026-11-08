# Audit log change object
Context: Discord developer reference: Audit log change object
[Source](audit-log-index.md) / [Previous source section](optional-audit-entry-info.md) / [Following source section](get-guild-audit-log.md)
<a id="source-audit-log-change-object"></a> <a id="source-audit-log-change-structure"></a> <a id="source-audit-log-change-exceptions"></a>

### Audit Log Change Object

 Many audit log events include a `changes` array on their [entry object](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object-audit-log-entry-structure). The [audit log entry structure](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object-audit-log-entry-structure) and the [individual change structure](https://docs.discord.com/developers/resources/audit-log#audit-log-change-object-audit-log-change-structure) depend on the event type and changed object, so apps should not expect one universal audit-log handling pattern.

###### Audit Log Change Structure

 Some events differ from the usual audit-log shape; [the next section](https://docs.discord.com/developers/resources/audit-log#audit-log-change-object-audit-log-change-exceptions) describes those exceptions. If a change has `old_value` but lacks `new_value`, the property was reset or set to `null`. If `old_value` is absent, the property was previously `null`.
| Field | Type | Description |
| --- | --- | --- |
| new_value? | mixed (matches object field’s type) | New value of the key |
| old_value? | mixed (matches object field’s type) | Old value of the key |
| key | string | Changed entity name, except for specified exceptions |

###### Audit Log Change Exceptions

 For most changed objects, change keys can be any field on that object. The table below lists cases that do not follow that pattern.
| Object Changed | Change Key Exceptions | Change Object Exceptions |
| --- | --- | --- |
| Command Permission | snowflake as key | The `changes` array uses objects whose `key` is the affected command entity, such as a role, channel, or user ID; each object includes the prior permissions object under `old_value` and the updated permissions object under `new_value` |
| Invite and Invite Metadata | Extra `channel_id` key rather than the object's `channel.id` |  |
| Partial Role | `$add` and `$remove` as keys | `new_value` contains an array of objects with role `id` and `name` |
| Webhook | `avatar_hash` key (instead of `avatar`) |  |


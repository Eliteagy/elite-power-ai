# Audit log entry object
Context: Discord developer reference: Audit log entry object
[Source](audit-log-index.md) / [Previous source section](audit-log-structure.md) / [Following source section](audit-log-events.md)
<a id="source-audit-log-entry-object"></a> <a id="source-audit-log-entry-structure"></a>

### Audit Log Entry Object

 An audit log entry records one administrative action or [event](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object-audit-log-events), identified by `action_type`. Most entries include a `changes` array with one or more modifications to a Discord entity such as a user, channel, guild, emoji, or another object. The content and shape of those changes depends on the entry type. For `MEMBER_ROLE_UPDATE`, a single change indicates that a role was added or removed. For `CHANNEL_CREATE`, many changes can appear, including channel name, channel type, and created permission overwrites. See the [change object](https://docs.discord.com/developers/resources/audit-log#audit-log-change-object) section for more information. Apps can explain an administrative API action by sending `X-Audit-Log-Reason`; Discord stores it in the entry `reason` field. `X-Audit-Log-Reason` accepts 1-512 URL-encoded UTF-8 characters. Users can see reasons in the client, and apps receive them when fetching audit log entries.

###### Audit Log Entry Structure

| Field | Type | Description |
| --- | --- | --- |
| target_id | ?string | ID for the affected entity, such as a webhook, user, or role |
| changes? | array of audit log change objects | Changes applied to the target_id |
| user_id | ?snowflake | User or app responsible for the change |
| id | snowflake | ID of the entry |
| action_type | audit log event | Type of action that occurred |
| options? | optional audit entry info | Extra details for particular event types |
| reason? | string | Reason for the change (1-512 characters) |

 For `APPLICATION_COMMAND_PERMISSION_UPDATE`, `target_id` is either the command ID or app ID because `changes` represents the full `permissions` property on the [guild permissions](https://docs.discord.com/developers/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) object.


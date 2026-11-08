# Optional audit entry info
Context: Discord developer reference: Optional audit entry info
[Source](audit-log-index.md) / [Owning endpoint, event, object or procedure conditions](audit-log-entry-object.md) / [Previous source section](audit-log-events.md) / [Following source section](audit-log-change-object.md)
<a id="source-optional-audit-entry-info"></a>

###### Optional Audit Entry Info

| Field | Type | Description | Event Types |
| --- | --- | --- | --- |
| application_id | snowflake | ID of the app targeted by the permission change | APPLICATION_COMMAND_PERMISSION_UPDATE |
| auto_moderation_rule_name | string | Name of the triggered Auto Moderation rule | AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED & AUTO_MODERATION_QUARANTINE_USER |
| auto_moderation_rule_trigger_type | string | Trigger type for the Auto Moderation rule that fired | AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED & AUTO_MODERATION_QUARANTINE_USER |
| channel_id | snowflake | Channel where the entities were targeted | MEMBER_MOVE & MESSAGE_PIN & MESSAGE_UNPIN & MESSAGE_DELETE & STAGE_INSTANCE_CREATE & STAGE_INSTANCE_UPDATE & STAGE_INSTANCE_DELETE & AUTO_MODERATION_BLOCK_MESSAGE & AUTO_MODERATION_FLAG_TO_CHANNEL & AUTO_MODERATION_USER_COMMUNICATION_DISABLED & AUTO_MODERATION_QUARANTINE_USER & VOICE_CHANNEL_STATUS_CREATE & VOICE_CHANNEL_STATUS_DELETE |
| count | string | Count of targeted entities | MESSAGE_DELETE & MESSAGE_BULK_DELETE & MEMBER_DISCONNECT & MEMBER_MOVE |
| delete_member_days | string | Inactive-day threshold used before members were pruned | MEMBER_PRUNE |
| id | snowflake | ID of the overwritten entity | CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE |
| members_removed | string | How many members the prune removed | MEMBER_PRUNE |
| message_id | snowflake | ID for the targeted message | MESSAGE_PIN & MESSAGE_UNPIN |
| role_name | string | Role name when type is `"0"`; omitted when type is `"1"` | CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE |
| type | string | Overwritten entity type: role (`"0"`) or member (`"1"`) | CHANNEL_OVERWRITE_CREATE & CHANNEL_OVERWRITE_UPDATE & CHANNEL_OVERWRITE_DELETE |
| integration_type | string | Integration type that executed the action | MEMBER_KICK & MEMBER_ROLE_UPDATE |
| status | string | The new voice channel status | VOICE_CHANNEL_STATUS_CREATE |


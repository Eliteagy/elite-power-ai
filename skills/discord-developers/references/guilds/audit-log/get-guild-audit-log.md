# Get guild audit log
Context: Discord developer reference: Get guild audit log
[Source](audit-log-index.md) / [Previous source section](audit-log-change-object.md)
<a id="source-get-guild-audit-log"></a> <a id="source-query-string-params"></a>

### Get Guild Audit Log

  Returns the guild [audit log](https://docs.discord.com/developers/resources/audit-log#audit-log-object) object. The caller needs [`VIEW_AUDIT_LOG`](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags). Returned audit log entry ordering depends on `before` or `after`. With `before`, entries are sorted by audit log entry ID in **descending** order, newest first. With `after`, Discord reverses the list to **ascending** order, oldest first. If neither `before` nor `after` is provided, Discord behaves as if `before` is the current timestamp and returns the latest entries in descending ID order. Use `after=0` for the opposite, oldest-first behavior.

###### Query String Params

 Use these query parameters to filter the returned audit log entries and control result count.
| Field | Type | Description |
| --- | --- | --- |
| user_id? | snowflake | Entries created by a given user ID |
| action_type? | integer | Entries for one audit log event type |
| before? | snowflake | Entries whose ID is lower than a given audit log entry ID |
| after? | snowflake | Entries whose ID is higher than a given audit log entry ID |
| limit? | integer | Maximum entries to return, from 1-100; defaults to 50 |

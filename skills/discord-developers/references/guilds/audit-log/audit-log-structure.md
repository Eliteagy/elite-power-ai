# Audit log structure
Context: Discord developer reference: Audit log structure
[Source](audit-log-index.md) / [Previous source section](audit-log.md) / [Following source section](audit-log-entry-object.md)
<a id="source-audit-log-object"></a> <a id="source-audit-log-structure"></a> <a id="source-example-partial-integration-object"></a>

### Audit Log Object

###### Audit Log Structure

| Field | Type | Description |
| --- | --- | --- |
| application_commands | array of application commands objects | Application commands that the audit log references |
| audit_log_entries | array of audit log entry objects | Audit log entries ordered newest to oldest |
| auto_moderation_rules | array of auto moderation rule objects | Auto moderation rules referenced by the audit log |
| guild_scheduled_events | array of guild scheduled event objects | Guild scheduled events referenced by the audit log |
| integrations | array of partial integration objects | List of partial integration objects |
| threads | array of thread-specific channel objects | Threads referenced by the audit log* |
| users | array of user objects | Users referenced by the audit log |
| webhooks | array of webhook objects | Webhooks referenced by the audit log |

 * The threads map includes threads referenced by `THREAD_CREATE` and `THREAD_UPDATE` because clients may not retain archived threads in memory.

###### Example Partial Integration Object

```
{
  "id": "33590653072239123",
  "name": "A Name",
  "type": "twitch",
  "account": {
    "name": "twitchusername",
    "id": "1234567"
  },
  "application_id": "94651234501213162"
}

```


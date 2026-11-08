# Audit log
Context: Discord developer reference: Audit log
[Source](audit-log-index.md) / [Following source section](audit-log-structure.md)
<a id="source-audit-log"></a>

# Audit Log

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Discord creates a guild audit-log entry whenever an administrative guild action occurs. Users need `VIEW_AUDIT_LOG` to view it, and apps can retrieve it with [`GET /guilds/{guild.id}/audit-logs`](https://docs.discord.com/developers/resources/audit-log#get-guild-audit-log); users can also see it in **Server Settings**. Entries are retained for 45 days. When an app performs an eligible API action, it may include `X-Audit-Log-Reason` to record the reason. See [audit log entry](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object) for details.


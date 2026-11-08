# Permissions
Context: Discord developer reference: Permissions
[Source](threads-index.md) / [Previous source section](active-archived-threads.md) / [Following source section](gateway-events.md)
<a id="source-permissions"></a>

### Permissions

 Threads usually inherit permissions from the parent channel; for example, permission to add reactions in the parent generally applies in the thread. Three bits are thread-specific: `CREATE_PUBLIC_THREADS`, `CREATE_PRIVATE_THREADS`, and `SEND_MESSAGES_IN_THREADS`. `SEND_MESSAGES` does nothing inside threads; speaking in a thread requires `SEND_MESSAGES_IN_THREADS`. Private threads work like guild-scoped Group DMs: viewing or participating requires an invite or moderator status through `MANAGE_THREADS`. The gateway also treats threads differently from channels, because clients are not told about threads they cannot view.


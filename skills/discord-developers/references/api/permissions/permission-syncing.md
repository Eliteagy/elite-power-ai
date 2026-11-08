# Permission syncing
Context: Discord developer reference: Permission syncing
[Source](permissions-index.md) / [Previous source section](inherited-permissions-threads.md) / [Following source section](role-object.md)
<a id="source-permission-syncing"></a>

### Permission Syncing

Categories do not pass permissions to child channels through simple inheritance. Discord uses Permission Syncing instead. A child channel is "synced" when its permissions and overwrites match its parent category, including the absence of overwrites. Later changes to the **parent category** are reflected in synced child channels. Later changes made directly to a **child channel** desync it, so future category permission changes no longer update that child channel.


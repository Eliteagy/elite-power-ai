# Delete guild role
Context: Discord developer reference: Delete guild role
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](modify-guild-role.md) / [Following source section](get-guild-prune-count.md)
<a id="source-delete-guild-role"></a>

### Delete Guild Role

  Remove a guild role. The caller needs `MANAGE_ROLES`. A successful deletion returns an empty `204` response, emits a [Guild Role Delete](https://docs.discord.com/developers/events/gateway-events#guild-role-delete) Gateway event, and may include the `X-Audit-Log-Reason` header.


# Remove guild member role
Context: Discord developer reference: Remove guild member role
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](add-guild-member-role.md) / [Following source section](remove-guild-member.md)
<a id="source-remove-guild-member-role"></a>

### Remove Guild Member Role

  Removes one role from a [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object). The caller needs the `MANAGE_ROLES` permission. Responds with a 204 empty response after a successful request. Emits a [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update) Gateway event. The `X-Audit-Log-Reason` header is accepted by this endpoint.


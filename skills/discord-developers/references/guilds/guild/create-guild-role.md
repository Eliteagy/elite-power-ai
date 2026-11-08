# Create guild role
Context: Discord developer reference: Create guild role
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](get-guild-role-member-counts.md) / [Following source section](create-guild-role-json-params.md)
<a id="source-create-guild-role"></a>

### Create Guild Role

  Creates a new [role](https://docs.discord.com/developers/topics/permissions#role-object) for the guild. The caller needs the `MANAGE_ROLES` permission. Responds using the new [role](https://docs.discord.com/developers/topics/permissions#role-object) object record after a successful request. Emits a [Guild Role Create](https://docs.discord.com/developers/events/gateway-events#guild-role-create) Gateway event. Every JSON parameter is optional. The `X-Audit-Log-Reason` header is accepted by this endpoint.


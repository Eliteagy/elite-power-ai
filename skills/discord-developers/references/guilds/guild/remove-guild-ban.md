# Remove guild ban
Context: Discord developer reference: Remove guild ban
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](create-guild-ban.md) / [Following source section](bulk-guild-ban.md)
<a id="source-remove-guild-ban"></a>

### Remove Guild Ban

  Remove the ban for a user. The caller needs the `BAN_MEMBERS` permissions. Responds with a 204 empty response after a successful request. Emits a [Guild Ban Remove](https://docs.discord.com/developers/events/gateway-events#guild-ban-remove) Gateway event. The `X-Audit-Log-Reason` header is accepted by this endpoint.


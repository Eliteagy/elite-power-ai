# Remove guild member
Context: Discord developer reference: Remove guild member
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](remove-guild-member-role.md) / [Following source section](get-guild-bans.md)
<a id="source-remove-guild-member"></a>

### Remove Guild Member

  Removes one member from a guild. The caller needs `KICK_MEMBERS` permission. Responds with a 204 empty response after a successful request. Emits a [Guild Member Remove](https://docs.discord.com/developers/events/gateway-events#guild-member-remove) Gateway event. The `X-Audit-Log-Reason` header is accepted by this endpoint.


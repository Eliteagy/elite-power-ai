# Modify current user nick
Context: Discord developer reference: Modify current user nick
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](modify-current-member.md) / [Following source section](add-guild-member-role.md)
<a id="source-modify-current-user-nick"></a> <a id="source-json-params-6"></a>

### Modify Current User Nick

  Deprecated in favor of [Updates Current Member](https://docs.discord.com/developers/resources/guild#modify-current-member). Updates the nickname for the current user in a guild. Responds with a 200 using the nickname after a successful request. Emits a [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update) Gateway event. The `X-Audit-Log-Reason` header is accepted by this endpoint.

###### JSON Params

| Field | Type | Description | Permission |
| --- | --- | --- | --- |
| nick? | ?string | Value assigned to user’s nickname to | CHANGE_NICKNAME |


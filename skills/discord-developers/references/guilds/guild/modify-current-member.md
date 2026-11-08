# Modify current member
Context: Discord developer reference: Modify current member
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](modify-guild-member.md) / [Following source section](modify-current-user-nick.md)
<a id="source-modify-current-member"></a> <a id="source-json-params-5"></a>

### Modify Current Member

  Updates the current member in a guild. Responds with a 200 using the updated member object record after a successful request. Emits a [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update) Gateway event. The `X-Audit-Log-Reason` header is accepted by this endpoint.

###### JSON Params

| Field | Type | Description | Permission |
| --- | --- | --- | --- |
| nick? | ?string | Value assigned to user’s nickname to | CHANGE_NICKNAME |
| banner? | ?string | data URI base64 encoded banner image |  |
| avatar? | ?string | data URI base64 encoded avatar image |  |
| bio? | ?string | guild member bio |  |


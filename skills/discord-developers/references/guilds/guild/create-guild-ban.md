# Create guild ban
Context: Discord developer reference: Create guild ban
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](get-guild-ban.md) / [Following source section](remove-guild-ban.md)
<a id="source-create-guild-ban"></a> <a id="source-json-params-7"></a>

### Create Guild Ban

  Creates a server ban, and optionally delete previous messages emitted by the banned user. The caller needs the `BAN_MEMBERS` permission. Responds with a 204 empty response after a successful request. Emits a [Guild Ban Add](https://docs.discord.com/developers/events/gateway-events#guild-ban-add) Gateway event. The `X-Audit-Log-Reason` header is accepted by this endpoint.

###### JSON Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| delete_message_days? | integer | Count of days to delete messages for (0-7) (deprecated) | 0 |
| delete_message_seconds? | integer | Count of seconds to delete messages for, between 0 and 604800 (7 days) | 0 |


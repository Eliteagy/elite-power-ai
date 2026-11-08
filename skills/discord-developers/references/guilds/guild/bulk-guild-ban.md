# Bulk guild ban
Context: Discord developer reference: Bulk guild ban
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](remove-guild-ban.md) / [Following source section](get-guild-roles.md)
<a id="source-bulk-guild-ban"></a> <a id="source-json-params-8"></a> <a id="source-bulk-ban-response"></a>

### Bulk Guild Ban

  Ban up to 200 user accounts from a guild, and optionally delete previous messages emitted by the banned users. Needs both the `BAN_MEMBERS` and `MANAGE_GUILD` permissions. Responds with a 200 response after a successful request, covering the fields `banned_users` using the IDs for the banned user accounts plus `failed_users` with IDs that could not be banned or were already banned. The `X-Audit-Log-Reason` header is accepted by this endpoint.

###### JSON Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| user_ids | array of snowflakes | List of user ids to ban (max 200) |  |
| delete_message_seconds? | integer | Count of seconds to delete messages for, between 0 and 604800 (7 days) | 0 |

###### Bulk Ban Response

 On success, this route returns a 200 success response using the following body.
| Field | Type | Description |
| --- | --- | --- |
| banned_users | array of snowflakes | List of user ids, that were successfully banned |
| failed_users | array of snowflakes | List of user ids, that were not banned |

 Once none for the user accounts could be banned, an error code response `500000: Failed to ban users` is provided instead.


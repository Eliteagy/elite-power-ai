# Rate limits rate limited
Context: Discord developer reference: Rate limits rate limited
[Source](reaction-presence-and-user-events-index.md) / [Previous source section](message-poll-vote-remove.md)
<a id="source-rate-limits"></a> <a id="source-rate-limited"></a> <a id="source-rate-limited-fields"></a> <a id="source-rate-limit-metadata-for-opcode-structure"></a> <a id="source-request-guild-member-rate-limit-metadata-structure"></a>

### Rate Limits

#### Rate Limited

 Emitted when an app hits a gateway event rate limit, such as for [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members). The changelog entry [Introducing Rate Limit When Requesting All Guild Members](https://docs.discord.com/developers/change-log#introducing-rate-limit-when-requesting-all-guild-members) explains the rate limit and rollout timing.

###### Rate Limited Fields

| Field | Type | Description |
| --- | --- | --- |
| opcode | integer | Gateway opcode for the rate-limited event. |
| retry_after | float | Seconds to wait before sending another request. |
| meta | Rate Limit Metadata for Opcode | Metadata describing the rate-limited event. |

###### Rate Limit Metadata for Opcode Structure

| Opcode | Type |
| --- | --- |
| 8 | Request Guild Member Rate Limit Metadata |

###### Request Guild Member Rate Limit Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild whose members should be fetched. |
| nonce? | string | nonce used to match the Guild Members Chunk response. |

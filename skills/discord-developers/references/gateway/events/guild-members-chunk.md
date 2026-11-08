# Guild members chunk
Context: Discord developer reference: Guild members chunk
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-member-update.md) / [Following source section](guild-role-create.md)
<a id="source-guild-members-chunk"></a> <a id="source-guild-members-chunk-event-fields"></a>

#### Guild Members Chunk

 Dispatched in response to [Guild Request Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members). Use `chunk_index` with `chunk_count` to determine how many chunks remain for the request.

###### Guild Members Chunk Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| members | array of guild member objects | Set of guild members |
| chunk_index | integer | Index of this chunk among the expected response chunks (`0 <= chunk_index < chunk_count`) |
| chunk_count | integer | Total expected chunk count for this response |
| not_found? | array | Returned here when an invalid ID is passed to `REQUEST_GUILD_MEMBERS` |
| presences? | array of presence objects | Presences for returned members appear here when `true` is passed to `REQUEST_GUILD_MEMBERS` |
| nonce? | string | Nonce from the Guild Members Request |


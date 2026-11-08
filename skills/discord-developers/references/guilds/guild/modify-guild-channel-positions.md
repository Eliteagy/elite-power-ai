# Modify guild channel positions
Context: Discord developer reference: Modify guild channel positions
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](create-guild-channel.md) / [Following source section](list-active-guild-threads.md)
<a id="source-modify-guild-channel-positions"></a> <a id="source-json-params-2"></a>

### Modify Guild Channel Positions

  Updates the positions of a set of [channel](https://docs.discord.com/developers/resources/channel#channel-object) object records for the guild. The caller needs `MANAGE_CHANNELS` permission. Responds with a 204 empty response after a successful request. Emits multiple [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) Gateway events. Only channel records to be modified are required. This route takes a JSON list of parameters within the following format:

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | channel id |
| position? | ?integer | Sort position for that channel (channels using the same position are sorted by id) |
| lock_permissions? | ?boolean | Synchronizes permission overwrites using the new parent, once moving to a new category |
| parent_id? | ?snowflake | New parent ID for that channel that is moved |


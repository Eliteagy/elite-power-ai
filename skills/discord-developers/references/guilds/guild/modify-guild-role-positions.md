# Modify guild role positions
Context: Discord developer reference: Modify guild role positions
[Source](roles-pruning-and-guild-settings-index.md) / [Following source section](create-guild-role-json-params.md) / [Following source section](modify-guild-role-positions-json-params.md)
<a id="source-guild-part-3"></a> <a id="source-modify-guild-role-positions"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### Modify Guild Role Positions

  Change ordering for one or more guild [role](https://docs.discord.com/developers/topics/permissions#role-object) objects. The caller must have `MANAGE_ROLES`. On success, the response contains every [role](https://docs.discord.com/developers/topics/permissions#role-object) object in the guild. The operation emits multiple [Guild Role Update](https://docs.discord.com/developers/events/gateway-events#guild-role-update) Gateway events, accepts `X-Audit-Log-Reason`, and expects a JSON array using this parameter shape:


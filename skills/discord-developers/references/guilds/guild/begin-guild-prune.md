# Begin guild prune
Context: Discord developer reference: Begin guild prune
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-prune-count.md) / [Following source section](get-guild-voice-regions.md)
<a id="source-begin-guild-prune"></a> <a id="source-json-params-2"></a>

### Begin Guild Prune

  Start a guild prune. The caller needs `MANAGE_GUILD` and `KICK_MEMBERS`. The response has one `pruned` key with the number of removed members; for large guilds, set `compute_prune_count` to `false` so `pruned` is forced to `null`. The action emits multiple [Guild Member Remove](https://docs.discord.com/developers/events/gateway-events#guild-member-remove) Gateway events. By default, members with roles are not pruned. Use `include_roles` to include selected roles: inactive users whose role set is contained within the supplied role or roles are pruned, while users with extra roles are not. The endpoint accepts `X-Audit-Log-Reason`.

###### JSON Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| days | integer | number of days to prune (1-30) | 7 |
| compute_prune_count | boolean | whether to include `pruned` in the response; avoid enabling this for large guilds | true |
| include_roles | array of snowflakes | role(s) to include | none |
| reason? | string | reason for the prune (deprecated) |  |


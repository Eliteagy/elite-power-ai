# Get guild prune count
Context: Discord developer reference: Get guild prune count
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](delete-guild-role.md) / [Following source section](begin-guild-prune.md)
<a id="source-get-guild-prune-count"></a> <a id="source-query-string-params"></a>

### Get Guild Prune Count

  Return an object containing a single `pruned` key with the member count that a prune would remove. This requires both `MANAGE_GUILD` and `KICK_MEMBERS`. Pruning excludes users with roles by default. Supplying `include_roles` lets specific roles participate; inactive users whose roles are a subset of the provided role or roles are counted, while users with other additional roles are excluded.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| days | integer | days of inactivity to include in the prune count, from 1 through 30 | 7 |
| include_roles | string containing a comma-separated snowflake array | role(s) to include | none |


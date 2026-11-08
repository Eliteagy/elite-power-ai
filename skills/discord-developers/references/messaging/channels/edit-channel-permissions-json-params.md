# Edit channel permissions JSON params
Context: Discord developer reference: Edit channel permissions JSON params
[Source](channel-objects-and-settings-index.md) / [Source](invites-permissions-and-threads-index.md) / [Owning endpoint, event, object or procedure conditions](edit-channel-permissions.md) / [Previous source section](get-channel-invites.md)
<a id="source-json-params-1"></a>

###### JSON Params
| Field | Type | Description |
| --- | --- | --- |
| allow? | string? | Bitwise value for every allowed permission; default is `"0"`. |
| deny? | string? | Bitwise value for every denied permission; default is `"0"`. |
| type | integer | Use 0 for a role and 1 for a member. |


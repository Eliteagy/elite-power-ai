# Bulk update lobby members parameters
Context: Discord developer reference: Bulk update lobby members parameters
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](bulk-update-lobby-members.md) / [Following source section](remove-a-member-from-a-lobby.md)
<a id="source-json-params-4"></a>

### JSON Params

 Member object array. Minimum 1, maximum 25.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | Discord user id for the lobby user to add, update, or remove |
| metadata? | ?dict<string, string> | optional string key/value dictionary; maximum combined length 1000. |
| flags? | integer | lobby member flags represented as a combined bitfield |
| remove_member? | boolean | when `true`, remove the user from the lobby instead of upserting. Default `false`. |


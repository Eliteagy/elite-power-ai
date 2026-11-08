# Lobby member JSON params
Context: Discord developer reference: Lobby member JSON params
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Owning endpoint, event, object or procedure conditions](create-lobby-parameters.md) / [Following source section](create-or-join-lobby.md)
<a id="source-lobby-member-json-params"></a>

#### Lobby Member JSON Params

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | Discord user id for the lobby member to add |
| metadata? | ?dict<string, string> | optional string key/value dictionary; maximum combined length 1000. |
| flags? | integer | lobby member flags represented as a combined bitfield |


# Create lobby parameters
Context: Discord developer reference: Create lobby parameters
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](lobby-object-create-lobby.md) / [Following source section](lobby-member-json-params.md)
<a id="source-json-params"></a>

### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| metadata? | ?dict<string, string> | optional string key/value dictionary; maximum combined length 1000. |
| members? | array of lobby member objects | optional array containing up to 25 users to add to the lobby |
| idle_timeout_seconds? | integer | seconds to wait before shutting down an idle lobby. Allowed range is 5 to 604800 (7 days). See `LobbyHandle` for behavior details. |


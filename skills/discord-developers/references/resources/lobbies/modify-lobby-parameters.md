# Modify lobby parameters
Context: Discord developer reference: Modify lobby parameters
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](lobby-object-modify-lobby.md) / [Following source section](lobby-object-delete-lobby.md)
<a id="source-json-params-2"></a>

### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| metadata? | ?dict<string, string> | optional string key/value dictionary. Maximum combined length 1000. Replaces existing metadata. |
| members? | array of lobby member objects | optional replacement list of up to 25 users for lobby membership. Members absent from this list are removed from the lobby. |
| idle_timeout_seconds? | integer | seconds to wait before shutting down an idle lobby. Allowed range is 5 to 604800 (7 days). See `LobbyHandle` for behavior details. |


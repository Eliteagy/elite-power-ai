# Create or join lobby parameters
Context: Discord developer reference: Create or join lobby parameters
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](create-or-join-lobby.md) / [Following source section](lobby-object-get-lobby.md)
<a id="source-json-params-1"></a>

### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| secret | string | secret that identifies the lobby. If this application already has a lobby with the secret, the caller joins it; otherwise Discord creates one. Maximum 250 characters. |
| idle_timeout_seconds? | integer | seconds to wait before shutting down an idle lobby. Allowed range is 5 to 604800 (7 days). See `LobbyHandle` for behavior details. |
| lobby_metadata? | ?dict<string, string> | optional string key/value dictionary for lobby metadata. Maximum combined length 1000. Replaces existing lobby metadata. |
| member_metadata? | ?dict<string, string> | optional string key/value dictionary for the calling user's lobby member. Maximum combined length 1000. |


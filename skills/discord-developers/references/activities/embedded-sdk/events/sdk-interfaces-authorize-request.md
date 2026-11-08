# SDK interfaces authorize request
Context: Discord developer reference: SDK interfaces authorize request
[Source](../methods-commands-and-events-index.md) / [Owning endpoint, event, object or procedure conditions](sdk-interfaces-activity.md) / [Previous source section](sdk-interfaces-authenticate-response.md) / [Following source section](sdk-interfaces-authorize-response.md)
<a id="source-authorizerequest"></a>

#### AuthorizeRequest

| Property | Type |
| --- | --- |
| client_id | string |
| scope | OAuthScopes[] |
| response_type? | ‘code’ |
| code_challenge? | string |
| state? | string |
| prompt? | ‘none’ |
| code_challenge_method? | ‘S256’ |


# Handle token response example response
Context: Discord developer reference: Handle token response example response
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Owning endpoint, event, object or procedure conditions](handle-token-response.md) / [Following source section](example-for-manual-token-authorization.md)
<a id="source-example-response-1"></a>

#### Example Response

```
{
  "access_token": "<access token>",
  "token_type": "Bearer",
  "expires_in": 604800,
  "refresh_token": "<refresh token>",
  "scope": "sdk.social_layer"
}

```

 When using the manual flow, call [`Client::CloseAuthorizeDeviceScreen`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a4fcdd697702d086a8170a2d60a69acb8) to close the authorization screen.


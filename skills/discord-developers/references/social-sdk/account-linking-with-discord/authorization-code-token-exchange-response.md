# Exchanging the authorization code for an access token example response
Context: Discord developer reference: Exchanging the authorization code for an access token example response
[Source](account-linking-with-discord-index.md) / [Owning endpoint, event, object or procedure conditions](server-to-server-get-token-exchange.md) / [Following source section](token-exchange-for-public-clients.md)
<a id="source-example-response"></a>

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


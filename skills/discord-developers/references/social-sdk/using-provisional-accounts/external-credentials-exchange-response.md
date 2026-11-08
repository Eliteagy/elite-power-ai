# External credentials exchange response
Context: Discord developer reference: External credentials exchange response
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](server-authentication-with-external-credentials-exchange.md) / [Following source section](authentication-for-public-clients.md)
<a id="source-external-credentials-exchange-response"></a>

#### External Credentials Exchange Response

```
{
  "access_token": "<access token>",
  "id_token": "<id token>",
  "token_type": "Bearer",
  "expires_in": 604800,
  "scope": "sdk.social_layer"
}

```

 OIDC responses may include `refresh_token`. The OAuth2 `refresh_token` grant is **deprecated** for it; re-authenticate with a fresh provider token instead. See Refreshing Provisional Account Tokens.


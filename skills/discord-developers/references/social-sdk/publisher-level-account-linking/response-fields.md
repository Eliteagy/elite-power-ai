# Response fields
Context: Discord developer reference: Response fields
[Source](publisher-level-account-linking-index.md) / [Previous source section](token-exchange-response.md) / [Following source section](integrating-with-the-social-sdk.md)
<a id="source-response-fields"></a>

### Response Fields

| Field | Description |
| --- | --- |
| `access_token` | Child access token used by the Social SDK |
| `token_type` | Always “Bearer” |
| `expires_in` | Expiration duration in seconds, matching the parent token's expiry |
| `scope` | OAuth2 scopes for the token |

 The child token endpoint does not issue a refresh token. To get another child token, perform the exchange again with the parent token.

---


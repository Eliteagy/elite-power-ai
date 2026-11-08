# Implicit grant
Context: Discord developer reference: Implicit grant
[Source](scopes-grants-and-installation-index.md) / [Previous source section](refresh-token-exchange-example.md) / [Following source section](client-credentials-grant.md)
<a id="source-implicit-grant"></a> <a id="source-authorization-url-example-1"></a> <a id="source-redirect-url-example-1"></a>

### Implicit Grant

 The implicit OAuth2 grant is a simpler flow intended for browser-based clients. Instead of returning an authorization code that the client exchanges for an access token, Discord issues the access token directly to the client. The URL uses this form:

###### Authorization URL Example

```
https://discord.com/oauth2/authorize?response_type=token&client_id=290926444748734499&state=15773059ghq9183habn&scope=identify

```

 After redirect, the redirect URI contains additional **URI fragments**: `access_token`, `token_type`, `expires_in`, `scope`, and [`state`](https://docs.discord.com/developers/topics/oauth2#state-and-security) if provided. **They are not querystring parameters.** Pay attention to the "#" character:

###### Redirect URL Example

```
https://findingfakeurlsisprettyhard.tv/#access_token=RTfP0OK99U3kbRtHOoKLmJbOn45PjL&token_type=Bearer&expires_in=604800&scope=identify&state=15773059ghq9183habn

```

 The implicit grant has tradeoffs. It is faster and simpler to implement, but the token is returned in the URI fragment rather than exchanged through a secure HTTP body, which can expose it to unauthorized parties. **No refresh token is returned, so the user must explicitly authorize again after the token expires.**


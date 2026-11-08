# State and security
Context: Discord developer reference: State and security
[Source](scopes-grants-and-installation-index.md) / [Previous source section](shared-resources.md) / [Following source section](authorization-code-grant.md)
<a id="source-state-and-security"></a>

### State and Security

 Before comparing OAuth2 grant semantics, address security through the `state` parameter. [Cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery), or CSRF, and [Clickjacking](https://en.wikipedia.org/wiki/Clickjacking) are risks OAuth implementers need to mitigate. The usual mitigation is `state`. The client sends `state` with the authorization request, and Discord returns it with the response. Its value should bind the request to the user's authenticated session, such as a hash of the session cookie or another nonce associated with that user's session. When the user begins authorization, generate a request-specific `state` value and store it somewhere accessible only to that client and user, such as storage protected by the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy). After redirect, compare the returned `state` to the stored value. A match indicates a valid authorization request. Treat a missing `state` or mismatched `state` as failed validation. A mismatch may mean interception or false authorization against another user's resources, so deny the request. Discord does not require `state`, but supports it and strongly recommends using it to protect applications and data.


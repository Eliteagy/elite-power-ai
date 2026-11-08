# OAuth flow explanation
Context: Discord developer reference: OAuth flow explanation
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](add-the-authentication-code.md) / [Following source section](oauth-flow-testing.md)
<a id="source-whats-happening-here"></a>

### What’s Happening Here?

1. Create an OAuth2 PKCE code verifier
2. Configure authorization arguments with the app ID and required scopes
3. Call [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) to begin the auth flow and open a browser
4. After authorization, exchange the code for an access token
 Never log access tokens or store them insecurely; treat them as sensitive credentials.


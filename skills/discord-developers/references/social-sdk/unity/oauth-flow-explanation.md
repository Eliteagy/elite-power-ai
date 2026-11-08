# OAuth flow explanation
Context: Discord developer reference: OAuth flow explanation
[Source](unity-setup-and-authentication-index.md) / [Previous source section](add-the-authentication-code.md) / [Following source section](oauth-flow-testing.md)
<a id="source-whats-happening-here"></a>

### What’s Happening Here?

1. The code creates an OAuth2 PKCE code verifier
2. It prepares authorization arguments with the app ID and requested scopes
3. [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) starts authentication and opens a browser
4. After authorization succeeds, the code is exchanged for an access token
 Never expose access tokens in logs or store them carelessly. Treat them as sensitive credentials.


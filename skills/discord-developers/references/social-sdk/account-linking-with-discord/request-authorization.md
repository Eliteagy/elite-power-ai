# Request authorization
Context: Discord developer reference: Request authorization
[Source](account-linking-with-discord-index.md) / [Previous source section](configure-oauth2-redirects.md) / [Following source section](request-authorization-authorization-scopes.md)
<a id="source-step-1-request-authorization"></a>

### Step 1: Request Authorization

 The SDK includes helpers for OAuth2 login. Call [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) to begin authorization and let the user approve access.


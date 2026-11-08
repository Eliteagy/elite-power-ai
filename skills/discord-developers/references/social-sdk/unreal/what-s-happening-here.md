# What s happening here
Context: Discord developer reference: What s happening here
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](discord-social-unreal-character-cpp.md) / [Following source section](connection-testing.md)
<a id="source-whats-happening-here"></a>

### What’s Happening Here?

1. Create an OAuth2 PKCE code verifier
2. Configure authorization arguments with the app ID and requested scopes
3. Begin authorization with [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468), which opens a browser
4. After authorization succeeds, exchange the code for an access token
5. Call [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4) so the SDK uses the access token for Discord API calls
6. After token update, call [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa); the SDK then connects asynchronously


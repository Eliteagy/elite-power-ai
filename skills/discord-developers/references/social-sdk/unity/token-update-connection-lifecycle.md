# Token update connection lifecycle
Context: Discord developer reference: Token update connection lifecycle
[Source](unity-setup-and-authentication-index.md) / [Previous source section](connect-the-sdk-to-discord.md) / [Following source section](testing-the-connection.md)
<a id="source-whats-happening-here-1"></a>

### What’s Happening Here?

1. [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4) gives the SDK the access token to use for Discord API calls
2. In the update-token callback, call [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa)
3. The SDK starts connecting asynchronously
4. The status text reports when the SDK reaches readiness


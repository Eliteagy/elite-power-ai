# Token update connection lifecycle
Context: Discord developer reference: Token update connection lifecycle
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](connect-the-sdk-to-discord.md) / [Following source section](testing-the-connection.md)
<a id="source-whats-happening-here-1"></a>

### What’s Happening Here?

1. `client->UpdateToken()` tells the SDK to use the access token for Discord API calls
2. After the token update completes, call `client->Connect()` in the callback
3. The SDK starts connecting asynchronously
4. The status callback from Step 6 reports when the client is ready
 Watch the console output; it should show status changes while the connection is established.


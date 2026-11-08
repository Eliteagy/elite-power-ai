# Connect the SDK to discord
Context: Discord developer reference: Connect the SDK to discord
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](oauth-token-program.md) / [Following source section](token-update-connection-lifecycle.md)
<a id="source-step-9-connect-the-sdk-to-discord"></a>

---

### Step 9: Connect the SDK to Discord

 With an access token available, connect the SDK to Discord. This takes two steps:
1. Give the SDK the access token by using [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4).
2. Start the connection with [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa).
 Find `// Next Step: Update the token and connect` inside `client->UpdateToken()`, then add the following code after it:

```
// Next Step: Update the token and connect
client->UpdateToken(discordpp::AuthorizationTokenType::Bearer,  accessToken, [client](discordpp::ClientResult result) {
  if(result.Successful()) {
    std::cout << "🔑 Token updated, connecting to Discord...\n";
    client->Connect();
  }
});

```


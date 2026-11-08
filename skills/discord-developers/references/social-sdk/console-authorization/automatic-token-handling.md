# Automatic token handling
Context: Discord developer reference: Automatic token handling
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](oauth2-device-authorization-flow.md) / [Following source section](manual-flow-for-console-authorization.md)
<a id="source-automatic-token-handling"></a>

### Automatic Token Handling

 This approach requires **Public Client** to be enabled for the app, which most games should avoid shipping with. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types) The SDK performs the complete OAuth2 device authorization process with one call to [`Client::GetTokenFromDevice`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a4a9c666b2d30bae0a16f5afd7ccee60d), including polling for the access token. After obtaining the access token, authenticate with [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4) and call [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa) to connect to Discord.

```
discordpp::DeviceAuthorizationArgs args{};
args.SetClientId(APPLICATION_ID);
args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());

client->GetTokenFromDevice(args, [client](
  discordpp::ClientResult result,
  std::string accessToken,
  std::string refreshToken,
  discordpp::AuthorizationTokenType tokenType,
  int32_t expiresIn,
  std::string scope) {
    if (result.Successful()) {
      std::cout << "🔓 Access token received! Establishing connection...\n";
      client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, accessToken, [client](discordpp::ClientResult result) {
        client->Connect();
      });
    } else {
      std::cerr << "❌ Failed to get token from device \n";
    }
  });

```

---


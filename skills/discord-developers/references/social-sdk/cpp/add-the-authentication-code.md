# Add the authentication code
Context: Discord developer reference: Add the authentication code
[Source](cpp-setup-and-authentication-index.md) / [Previous source section](account-linking-with-discord.md) / [Following source section](oauth-flow-explanation.md)
<a id="source-add-the-authentication-code"></a>

### Add the Authentication Code

 After the status callback setup in `main.cpp`, add this authentication code. **Choosing your OAuth2 scopes:** The guide uses [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c), which requests `openid` and `sdk.social_layer_presence`. Those scopes enable account linking, friends list access, rich presence, and other core behavior. If the game also needs lobbies, voice chat, or direct messaging, use [`Client::GetDefaultCommunicationScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a71499da752fbdc2d4326ae0fd36c0dd1). See the [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) for the complete breakdown.

```
// Generate OAuth2 code verifier for authentication
auto codeVerifier = client->CreateAuthorizationCodeVerifier();

// Set up authentication arguments
discordpp::AuthorizationArgs args{};
args.SetClientId(APPLICATION_ID);
args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());
args.SetCodeChallenge(codeVerifier.Challenge());

// Begin authentication process
client->Authorize(args, [client, codeVerifier](auto result, auto code, auto redirectUri) {
  if (!result.Successful()) {
    std::cerr << "❌ Authentication Error: " << result.Error() << std::endl;
    return;
  } else {
    std::cout << "✅ Authorization successful! Getting access token...\n";

    // Exchange auth code for access token
    client->GetToken(APPLICATION_ID, code, codeVerifier.Verifier(), redirectUri,
      [client](discordpp::ClientResult result,
      std::string accessToken,
      std::string refreshToken,
      discordpp::AuthorizationTokenType tokenType,
      int32_t expiresIn,
      std::string scope) {
        std::cout << "🔓 Access token received! Establishing connection...\n";
        // Next Step: Update the token and connect
    });
  }
});

```


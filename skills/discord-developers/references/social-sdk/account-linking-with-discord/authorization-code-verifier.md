# Authorization code verifier
Context: Discord developer reference: Authorization code verifier
[Source](account-linking-with-discord-index.md) / [Owning endpoint, event, object or procedure conditions](request-authorization.md) / [Previous source section](request-authorization-authorization-scopes.md) / [Following source section](user-approval.md)
<a id="source-authorization-code-verifier"></a>

#### Authorization Code Verifier

 If [Step 4](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#step-4-exchanging-the-authorization-code-for-an-access-token) uses [`Client::GetToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aaee636f91fb1ea3465157c20313b702c), your requests need a code challenge and a code verifier. The SDK can create both values for you with [`Client::CreateAuthorizationCodeVerifier`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aba6adc1f978e7bf4c5433c560e1ad704), so you do not need to implement that cryptographic setup yourself.

```
// Create a code verifier and challenge if using GetToken
auto codeVerifier = client->CreateAuthorizationCodeVerifier();
discordpp::AuthorizationArgs args{};
args.SetClientId(YOUR_DISCORD_APPLICATION_ID);
args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());
args.SetCodeChallenge(codeVerifier.Challenge());

client->Authorize(args, [client, codeVerifier](discordpp::ClientResult result, std::string code, std::string redirectUri) {
  if (!result.Successful()) {
    std::cerr << "❌ Authorization Error: " << result.Error() << std::endl;
  } else {
    std::cout << "✅ Authorization successful! Next step: exchange code for an access token \n";
  }
});

```


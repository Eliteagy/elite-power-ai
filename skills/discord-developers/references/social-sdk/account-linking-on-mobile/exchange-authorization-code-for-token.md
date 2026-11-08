# Exchange authorization code for token
Context: Discord developer reference: Exchange authorization code for token
[Source](account-linking-on-mobile-index.md) / [Previous source section](user-approval.md) / [Following source section](authentication-flow-for-confidential-clients.md)
<a id="source-step-4-exchange-authorization-code-for-token"></a>

### Step 4: Exchange Authorization Code for Token

 After the user approves and your app receives the authorization code, exchange that code for an access token with [`Client::GetToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aaee636f91fb1ea3465157c20313b702c) and the code verifier:

```
client->GetToken(
    YOUR_DISCORD_APPLICATION_ID,
    code,
    codeVerifier.Verifier(),  // Critical: Pass the verifier
    redirectUri,
    [client](discordpp::ClientResult result,
        std::string accessToken,
        std::string refreshToken,
        discordpp::AuthorizationTokenType tokenType,
        int32_t expiresIn,
        std::string scope) {
      if (!result.Successful()) {
        std::cerr << "❌ Error getting token: " << result.Error() << std::endl;
        return;
      }

      std::cout << "🔓 Access token received! Establishing connection...\n";

      // Update token and connect
      client->UpdateToken(tokenType, accessToken, [client](discordpp::ClientResult result) {
        client->Connect();
      });
    });

```

---


# Client side implementation request authorization
Context: Discord developer reference: Client side implementation request authorization
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](client-side-implementation-create-code-verifier-and-challenge.md) / [Following source section](server-side-implementation.md)
<a id="source-step-2-request-authorization-1"></a>

#### Step 2: Request Authorization

 Include the code challenge in the authorization request:

```
discordpp::AuthorizationArgs args{};
args.SetClientId(YOUR_DISCORD_APPLICATION_ID);
args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());
args.SetCodeChallenge(codeVerifier.Challenge());

client->Authorize(args, [client, codeVerifier](
    discordpp::ClientResult result,
    std::string code,
    std::string redirectUri) {
  if (!result.Successful()) {
    std::cerr << "❌ Authorization Error: " << result.Error() << std::endl;
  } else {
    std::cout << "✅ Authorization successful!\n";

    // Send BOTH the authorization code AND the code verifier to your server
    SendToServer(code, redirectUri, codeVerifier.Verifier());
  }
});

```

 **Critical**: Send the **code verifier** (not the challenge) to your server with the authorization code. The server needs the verifier to finish the token exchange.


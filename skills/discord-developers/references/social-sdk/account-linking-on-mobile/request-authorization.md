# Request authorization
Context: Discord developer reference: Request authorization
[Source](account-linking-on-mobile-index.md) / [Previous source section](create-code-verifier-and-challenge.md) / [Following source section](user-approval.md)
<a id="source-step-2-request-authorization"></a>

### Step 2: Request Authorization

 Call [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) with the code challenge:

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
    std::cout << "✅ Authorization successful! Exchanging code for token...\n";
    // Proceed to Step 3
  }
});

```


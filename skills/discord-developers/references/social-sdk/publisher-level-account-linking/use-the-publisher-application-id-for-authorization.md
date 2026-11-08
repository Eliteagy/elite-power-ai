# Use the publisher application id for authorization
Context: Discord developer reference: Use the publisher application id for authorization
[Source](publisher-level-account-linking-index.md) / [Previous source section](integrating-with-the-social-sdk.md) / [Following source section](connect-the-sdk-with-the-child-token.md)
<a id="source-use-the-publisher-application-id-for-authorization"></a>

### Use the Publisher Application ID for Authorization

 When the game starts authorization, use the **publisher application ID** rather than the game application ID:

```
// Use the PUBLISHER_APPLICATION_ID for authorization
discordpp::AuthorizationArgs args{};
args.SetClientId(PUBLISHER_APPLICATION_ID);  // Parent app ID, not child
args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());

client->Authorize(args, [](discordpp::ClientResult result, std::string code, std::string redirectUri) {
    if (result.Successful()) {
        std::cout << "✅ Authorization successful!" << std::endl;
        // Exchange code for parent token, then exchange parent token for child token
    }
});

```


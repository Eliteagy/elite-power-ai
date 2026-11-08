# Connect the SDK with the child token
Context: Discord developer reference: Connect the SDK with the child token
[Source](publisher-level-account-linking-index.md) / [Previous source section](use-the-publisher-application-id-for-authorization.md) / [Following source section](token-lifecycles.md)
<a id="source-connect-the-sdk-with-the-child-token"></a>

### Connect the SDK with the Child Token

 After your backend returns the child token, authenticate the Social SDK with it:

```
#include <discord-social-sdk/discord.h>

void InitializeSDKWithChildToken(const std::string& childAccessToken) {
    // Create SDK client instance
    auto client = std::make_shared<discordpp::Client>();

    // Update the client with the child token
    client->UpdateToken(
        discordpp::AuthorizationTokenType::Bearer,
        childAccessToken,
        [client](discordpp::ClientResult result) {
            if (result.Successful()) {
                std::cout << "✅ Token updated successfully!" << std::endl;

                // Connect to Discord
                client->Connect();
            } else {
                std::cerr << "❌ Failed to update token: " << result.Error() << std::endl;
            }
        }
    );
}

```

 After connection, Social SDK calls operate as the game (child) application.

---


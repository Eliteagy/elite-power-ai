# Set up message handling
Context: Discord developer reference: Set up message handling
[Source](linked-channels-index.md) / [Previous source section](try-it-out.md) / [Following source section](fetch-available-servers.md)
<a id="source-example-implementation"></a> <a id="source-step-1-set-up-message-handling"></a>

### Example Implementation

### Step 1: Set Up Message Handling

```
// filepath: your_game/channel_linking.cpp
void HandleDiscordMessage(const std::string& message) {
    std::cout << "📱 Game received: " << message << "\n";
    // Check if message is from the lobby
    // Display in your game UI
}

void SetupMessageHandlers(std::shared_ptr<discordpp::Client> client) {
    client->SetMessageCreatedCallback([](uint64_t messageId) {
        discordpp::MessageHandle message = client->GetMessageHandle(messageId);
        HandleDiscordMessage(message);
    });
}

```


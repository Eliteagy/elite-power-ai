# Send and receive messages
Context: Discord developer reference: Send and receive messages
[Source](linked-channels-index.md) / [Previous source section](link-channel-to-lobby.md) / [Following source section](putting-it-all-together.md)
<a id="source-step-4-send-and-receive-messages"></a>

### Step 4: Send and Receive Messages

```
void SendLobbyMessage(
    std::shared_ptr<discordpp::Client> client,
    uint64_t lobbyId,
    const std::string& message
) {
    client->SendLobbyMessage(lobbyId, message, [](auto result) {
        if (!result.Successful()) {
            std::cout << "❌ Failed to send message\n";
        }
    });
}

void UnlinkChannel(
    std::shared_ptr<discordpp::Client> client,
    uint64_t lobbyId
) {
    client->UnlinkChannelFromLobby(lobbyId, [](auto result) {
        if (result.Successful()) {
            std::cout << "✅ Channel unlinked\n";
        }
    });
}

```


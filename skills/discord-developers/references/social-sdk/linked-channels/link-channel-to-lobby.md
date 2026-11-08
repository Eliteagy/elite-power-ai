# Link channel to lobby
Context: Discord developer reference: Link channel to lobby
[Source](linked-channels-index.md) / [Previous source section](fetch-available-servers.md) / [Following source section](send-and-receive-messages.md)
<a id="source-step-3-link-channel-to-lobby"></a>

### Step 3: Link Channel to Lobby

```
void ShowPrivateChannelWarning() {
    std::cout << "⚠️ Warning: This is a private channel.\n";
    std::cout << "All lobby members will be able to see messages.\n";
    std::cout << "Do you want to continue? (y/n)\n";

    char response;
    std::cin >> response;
    return (response == 'y' || response == 'Y');
}

void LinkChannelToLobby(
    std::shared_ptr<discordpp::Client> client,
    uint64_t lobbyId,
    uint64_t channelId,
    bool isPrivate
) {
    if (isPrivate && !ShowPrivateChannelWarning()) {
        std::cout << "❌ Channel linking cancelled\n";
        return;
    }

    client->LinkChannelToLobby(
        lobbyId,
        channelId,
        [](auto result) {
            if (result.Successful()) {
                std::cout << "✅ Channel linked successfully!\n";
            } else {
                std::cout << "❌ Failed to link channel\n";
            }
        }
    );
}

```


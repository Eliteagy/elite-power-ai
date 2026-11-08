# Putting it all together
Context: Discord developer reference: Putting it all together
[Source](linked-channels-index.md) / [Previous source section](send-and-receive-messages.md) / [Following source section](joining-discord-servers-via-linked-lobbies.md)
<a id="source-step-5-putting-it-all-together"></a>

### Step 5: Putting It All Together

 These functions can be combined like this:

```
// filepath: your_game/main.cpp
int main() {
    auto client = std::make_shared<discordpp::Client>();

    // Set up handlers
    SetupMessageHandlers(client);

    // When user wants to link a channel:
    FetchDiscordServers(client);

    // After user selects a guild:
    FetchChannelsForGuild(client, selectedGuildId);

    // After user selects a channel:
    LinkChannelToLobby(
        client,
        currentLobbyId,
        selectedChannelId,
        isPrivateChannel
    );

    // When sending a message:
    SendLobbyMessage(client, currentLobbyId, "Hello from the game!");

    // When done with the channel:
    UnlinkChannel(client, currentLobbyId);

    return 0;
}

```


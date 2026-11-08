# Getting lobby chat history
Context: Discord developer reference: Getting lobby chat history
[Source](managing-lobbies-index.md) / [Previous source section](receiving-lobby-messages.md) / [Following source section](linking-a-channel-to-lobby.md)
<a id="source-getting-lobby-chat-history"></a>

### Getting Lobby Chat History

 Use [`Client::GetLobbyMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a0586192e85caf548b8b321f1cb21301f) to fetch earlier messages for a lobby. This supports showing prior chat when a user joins or needs conversation history. The function takes a lobby ID and a limit specifying how many recent messages to retrieve. **Important limitations:**
- Retrieval is limited to 200 messages and 72 hours of history
- A user can retrieve only messages from lobbies they currently belong to

```
const uint64_t lobbyId = 1234567890;
const uint32_t messageLimit = 50; // Number of recent messages to retrieve (max 200)

client->GetLobbyMessagesWithLimit(
  lobbyId, messageLimit,
  [](const discordpp::ClientResult &result, const std::vector<discordpp::MessageHandle> &messages) {
    if (result.Successful()) {
      std::cout << "? Retrieved " << messages.size()
                << " messages from lobby chat history!\n";

      // Process the messages (they are returned in chronological order)
      for (const auto &message : messages) {
        std::cout << "Message: " << message.Content() << std::endl;
      }
    } else {
      std::cerr << "? Failed to retrieve lobby chat history\n";
    }
  });

```

 Results are returned as [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f) objects in chronological order, oldest to newest. Each [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f) includes content, author information, and timestamp. This is useful for:
- Showing recent chat when a user enters a lobby
- Implementing chat history scrollback features
- Preserving conversation context across game sessions

---


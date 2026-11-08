# Retrieving messages from a specific conversation
Context: Discord developer reference: Retrieving messages from a specific conversation
[Source](sending-direct-messages-index.md) / [Previous source section](retrieving-all-conversation-summaries.md) / [Following source section](in-game-direct-message-settings.md)
<a id="source-retrieving-messages-from-a-specific-conversation"></a>

### Retrieving Messages from a Specific Conversation

 Call [`Client::GetUserMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a054a758a76c5873b38a4d79651a5f26c) to load history for one DM conversation:

```
const uint64_t recipientId = 1234567890; // The other user's Discord ID
const int32_t messageLimit = 50; // Number of recent messages to retrieve (max 200)

client->GetUserMessagesWithLimit(
    recipientId, messageLimit,
    [](const discordpp::ClientResult &result,
       const std::vector<discordpp::MessageHandle> &messages) {
        if (result.Successful()) {
            std::cout << "💬 Retrieved " << messages.size()
                     << " messages from conversation\n";

            // Messages are returned in reverse chronological order (newest first)
            for (const auto &message : messages) {
                std::cout << "Message: " << message.Content()
                         << " from " << message.AuthorId() << std::endl;
            }
        } else {
            std::cerr << "❌ Failed to retrieve message history\n";
        }
    }
);

```

 **Important limitations:**
- Retrieval is capped at 200 messages and 72 hours of history
- DM history is available only when both players have played the game
- If either participant has not played the game, no channel may exist between them and the request can return a 404 `discordpp::ErrorType::HTTPError` error
 Important behavior for [`Client::GetUserMessagesWithLimit`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a054a758a76c5873b38a4d79651a5f26c):
- Results are ordered reverse chronologically, with newest messages first
- The function uses the local cache first and performs an HTTP request only when necessary
- Use 0 or a negative `limit` value to request all available messages, still subject to the 200 message cap
 This functionality is useful for:
- Showing prior messages when a user opens a DM
- Implementing message scrollback features
- Preserving conversation context across game sessions
- Implementing a complete in-game messaging UI


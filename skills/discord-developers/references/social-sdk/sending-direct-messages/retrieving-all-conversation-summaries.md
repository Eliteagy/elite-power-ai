# Retrieving all conversation summaries
Context: Discord developer reference: Retrieving all conversation summaries
[Source](sending-direct-messages-index.md) / [Previous source section](getting-direct-message-history.md) / [Following source section](retrieving-messages-from-a-specific-conversation.md)
<a id="source-retrieving-all-conversation-summaries"></a>

### Retrieving All Conversation Summaries

 Call [`Client::GetUserMessageSummaries`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a32dafc20ff1f99b019e40bdc81f46dde) to list every user who has a DM conversation with the current user, including each conversation's latest message ID:

```
client->GetUserMessageSummaries([](const discordpp::ClientResult &result,
                                  const std::vector<discordpp::UserMessageSummary> &summaries) {
    if (result.Successful()) {
        std::cout << "📋 Retrieved " << summaries.size() << " conversations\n";

        for (const auto &summary : summaries) {
            std::cout << "User ID: " << summary.UserId()
                     << ", Last Message ID: " << summary.LastMessageId() << "\n";
        }
    } else {
        std::cerr << "❌ Failed to retrieve conversation summaries\n";
    }
});

```

 This is particularly useful for:
- Building a conversation list UI
- Identifying users with existing conversations
- Locating the newest activity for each conversation


# Sending a direct message to a user
Context: Discord developer reference: Sending a direct message to a user
[Source](sending-direct-messages-index.md) / [Previous source section](types-of-chat-messages.md) / [Following source section](syncing-messages-with-discord.md)
<a id="source-sending-a-direct-message-to-a-user"></a>

### Sending a Direct Message to a User

 The SDK can send a message as the user, but only in direct response to an action the user took. Do not send messages automatically. To send a direct message, provide the recipient's Discord ID and the message text.

```
std::string message = "ready to queue?";
uint64_t recipientId = 1234567890; // The recipient's Discord ID

client->SendUserMessage(recipientId, message, [](auto result, uint64_t messageId) {
  if (result.Successful()) {
    std::cout << "✅ Message sent successfully\n";
  } else {
    std::cout << "❌ Failed to send message: " << result.Error() << "\n";
  }
});

```


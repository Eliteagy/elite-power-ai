# Receiving lobby messages
Context: Discord developer reference: Receiving lobby messages
[Source](managing-lobbies-index.md) / [Previous source section](sending-messages-to-a-lobby.md) / [Following source section](getting-lobby-chat-history.md)
<a id="source-receiving-lobby-messages"></a>

### Receiving Lobby Messages

 Receive lobby messages by registering [`Client::SetMessageCreatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a28325a8e8c688a84ac851da4bc86e148). The callback fires for each new lobby message or DM. Use `messageId` to obtain the [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f), then fetch the [`ChannelHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ChannelHandle.html#ac32096b2ef15c5c220e9b7b92253cc46) to identify where the message was sent.

```
client->SetMessageCreatedCallback([&client](uint64_t messageId) {
  discordpp::MessageHandle message = client->GetMessageHandle(messageId);
  std::cout << "📨 New message received: " << message->Content() << "\n";
});

```

---


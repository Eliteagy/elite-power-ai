# Receiving and rendering messages
Context: Discord developer reference: Receiving and rendering messages
[Source](sending-direct-messages-index.md) / [Previous source section](syncing-messages-with-discord.md) / [Following source section](suppressing-double-notifications.md)
<a id="source-receiving-and-rendering-messages"></a>

### Receiving and Rendering Messages

 Register [`Client::SetMessageCreatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a28325a8e8c688a84ac851da4bc86e148) to react when the SDK receives a new message. Inside the callback, read message content and sender ID from the [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f). A [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f) represents one message delivered to the SDK.

```
client->SetMessageCreatedCallback([&client](uint64_t messageId) {
  if (auto message = client->GetMessageHandle(messageId)) {
    std::cout << "New message from " << message->AuthorId() << ": " << message->Content() << "\n";
  }
});

```

 The SDK also exposes callbacks for message edits and deletions. Register them with [`Client::SetMessageUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aa01cf3c15403f29780dabfcfaf3b1dcd) and [`Client::SetMessageDeletedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a2b6079eded10bea29abbb9695702637b).


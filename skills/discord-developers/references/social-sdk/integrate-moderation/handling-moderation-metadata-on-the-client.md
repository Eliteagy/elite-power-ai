# Handling moderation metadata on the client
Context: Discord developer reference: Handling moderation metadata on the client
[Source](integrate-moderation-index.md) / [Previous source section](moderation-metadata-fields.md) / [Following source section](handling-content-edits.md)
<a id="source-handling-moderation-metadata-on-the-client"></a>

### Handling Moderation Metadata on the Client

 Use [`Client::SetMessageUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aa01cf3c15403f29780dabfcfaf3b1dcd) to receive metadata changes. Read the backend-written key-value map through [`MessageHandle::ModerationMetadata`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#afb9ae126f6b1f0de006f2be8e3688205).

```
client->SetMessageUpdatedCallback([&client](uint64_t messageId) {
    if (auto message = client->GetMessageHandle(messageId)) {
        auto metadata = message->ModerationMetadata();
        if (metadata.empty()) {
            // No moderation decision yet — render as pending, normally, or hide completely,
            // depending on your moderation requirements
            renderPendingModeration(message);
            return;
        }
        auto action = metadata.count("action") ? metadata.at("action") : "show";
        if (action == "hide") {
            hideMessage(messageId);
        } else if (action == "show") {
            renderMessage(message);
        } else if (action == "replace") {
            renderMessage(messageId, metadata.at("replacement"));
        } else if (action == "blur") {
            renderBlurred(message);
        } else {
            std::cerr << "Unknown moderation action: " << action << "\n";
            renderMessage(message);  // fall back to rendering normally
        }
    }
});

```

 While moderation is pending, consider withholding new messages or showing a "pending moderation" state so unreviewed content is not briefly displayed.


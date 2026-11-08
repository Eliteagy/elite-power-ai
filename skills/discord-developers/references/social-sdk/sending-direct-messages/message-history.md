# Message history
Context: Discord developer reference: Message history
[Source](sending-direct-messages-index.md) / [Previous source section](legal-disclosure-message-type.md) / [Following source section](working-with-unrenderable-content.md)
<a id="source-message-history"></a>

### Message History

 The SDK stores the 25 newest messages per channel in memory, including DMs. To load older DM content, use [Getting Direct Message History](https://docs.discord.com/developers/discord-social-sdk/development-guides/sending-direct-messages#getting-direct-message-history) to request more history from Discord servers. An existing [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f) remains usable after the SDK drops the message from its recent-message cache, but new [`MessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#ae25595b43bc74b0c4c92c5165d16382f) objects for that discarded message cannot be created with [`Client::GetMessageHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7825220b28952a2156bd0e46db40ea5c).


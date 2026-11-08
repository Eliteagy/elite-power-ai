# Working with unrenderable content
Context: Discord developer reference: Working with unrenderable content
[Source](sending-direct-messages-index.md) / [Previous source section](message-history.md) / [Following source section](getting-direct-message-history.md)
<a id="source-working-with-unrenderable-content"></a>

### Working with Unrenderable Content

 Discord messages can include media and structures a game may not render, such as images, videos, embeds, polls, and other content. The game does not need to display those directly; instead, show a notice that additional content exists and provide a path to view it in Discord. [`MessageHandle::AdditionalContent`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1MessageHandle.html#af4497491a95fda65402b6acf7a8b42e5) includes metadata for that non-text content. Use it to render a placeholder, and link to Discord through [`Client::CanOpenMessageInDiscord`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ae2aac143a691091691c5cc75aa07dace) and [`Client::OpenMessageInDiscord`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a66b8f85b14403a5d5ea125f39aa6e1b1). More background is available in the [messages in the Discord API](https://docs.discord.com/developers/resources/message) documentation.


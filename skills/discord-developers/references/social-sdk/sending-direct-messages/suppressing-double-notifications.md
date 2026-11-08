# Suppressing double notifications
Context: Discord developer reference: Suppressing double notifications
[Source](sending-direct-messages-index.md) / [Previous source section](receiving-and-rendering-messages.md) / [Following source section](legal-disclosure-message-type.md)
<a id="source-suppressing-double-notifications"></a>

### Suppressing Double Notifications

 If the Discord desktop app is open on the same computer as the game, Discord may play notifications even though the messages are visible in-game. Call [`Client::SetShowingChat`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#acdf400ecb926392d1a110da73152b594) whenever the chat UI is shown or hidden so duplicate notifications can be suppressed.


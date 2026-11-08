# Handling content edits
Context: Discord developer reference: Handling content edits
[Source](integrate-moderation-index.md) / [Previous source section](handling-moderation-metadata-on-the-client.md) / [Following source section](discord-platform-bans.md)
<a id="source-handling-content-edits"></a>

### Handling Content Edits

 When a message is edited, Discord clears its stored `moderation_metadata` automatically and sends a new update notification. [`Client::SetMessageUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aa01cf3c15403f29780dabfcfaf3b1dcd) runs with an empty metadata map for that edited message, and the backend receives a `GAME_DIRECT_MESSAGE_UPDATE` or `LOBBY_MESSAGE_UPDATE` webhook event for the edit. Use that event to start moderation for the new content. During that re-moderation window, avoid rendering the updated message or show it as "pending moderation" so unmoderated content does not flash on screen.


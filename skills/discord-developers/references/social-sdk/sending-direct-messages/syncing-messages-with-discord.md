# Syncing messages with discord
Context: Discord developer reference: Syncing messages with discord
[Source](sending-direct-messages-index.md) / [Previous source section](sending-a-direct-message-to-a-user.md) / [Following source section](receiving-and-rendering-messages.md)
<a id="source-syncing-messages-with-discord"></a>

### Syncing Messages with Discord

 Some Social SDK messages from the game are also shown in Discord. That synchronization occurs for:
- 1 on 1 chat where at least one participant is a full Discord user
- Lobby chat when that lobby is [linked to a Discord channel](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels)
- Messages sent by users who are not banned on Discord.
 For messages between provisional accounts or users who are not friends, the channel ID and recipient ID are both set to the other user's ID. These messages are ephemeral and are not stored in a channel, so a [`ChannelHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1ChannelHandle.html#ac32096b2ef15c5c220e9b7b92253cc46) cannot be resolved for them.

---


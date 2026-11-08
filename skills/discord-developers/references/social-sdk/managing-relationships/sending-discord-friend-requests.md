# Sending discord friend requests
Context: Discord developer reference: Sending discord friend requests
[Source](managing-relationships-index.md) / [Previous source section](sending-game-friend-requests.md) / [Following source section](accept-incoming-friend-requests.md)
<a id="source-sending-discord-friend-requests"></a>

### Sending Discord Friend Requests

 Sends a Discord friend request to the target user, or accepts one when the target already sent a pending request. You may address the target by Discord unique username or user ID. After sending, both users get a Discord relationship. The current user's [`RelationshipHandle::DiscordRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#a5fecfb79a4a2b6f3dc5f73b09d0c3881) becomes `RelationshipType::PendingOutgoing`, while the target user's value becomes `RelationshipType::PendingIncoming`. If the current user already has an incoming Discord friend request from that target, meaning [`RelationshipHandle::DiscordRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#a5fecfb79a4a2b6f3dc5f73b09d0c3881) is `RelationshipType::PendingIncoming`, the action makes the users Discord friends.

```
client->SendDiscordFriendRequest("username", [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Discord friend request sent successfully!\n";
  }
});

client->SendDiscordFriendRequestById(123456789, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Discord friend request sent successfully!\n";
  }
});

```


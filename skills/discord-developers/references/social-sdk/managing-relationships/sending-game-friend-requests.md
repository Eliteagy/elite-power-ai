# Sending game friend requests
Context: Discord developer reference: Sending game friend requests
[Source](managing-relationships-index.md) / [Previous source section](relationship-actions.md) / [Following source section](sending-discord-friend-requests.md)
<a id="source-sending-game-friend-requests"></a>

### Sending Game Friend Requests

 Sends a game friend request to the target user, or accepts one when the target already sent a pending request. You may address the target by Discord unique username or user ID. After sending, both users get a game relationship. The current user's [`RelationshipHandle::GameRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#aa60146eb72ede07e3e615565f61f97eb) becomes `RelationshipType::PendingOutgoing`, while the target user's value becomes `RelationshipType::PendingIncoming`. If the current user already has an incoming game friend request from that target, meaning [`RelationshipHandle::GameRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#aa60146eb72ede07e3e615565f61f97eb) is `RelationshipType::PendingIncoming`, the action makes the users game friends.

```
client->SendGameFriendRequest("username", [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Game friend request sent successfully!\n";
  }
});

client->SendGameFriendRequestById(123456789, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Game friend request sent successfully!\n";
  }
});

```


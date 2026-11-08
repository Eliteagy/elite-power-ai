# Accept incoming friend requests
Context: Discord developer reference: Accept incoming friend requests
[Source](managing-relationships-index.md) / [Previous source section](sending-discord-friend-requests.md) / [Following source section](reject-incoming-friend-requests.md)
<a id="source-accept-incoming-friend-requests"></a>

### Accept Incoming Friend Requests

 Let players accept incoming friend requests represented by `RelationshipType::PendingIncoming`.

```
// RelationshipHandle::DiscordRelationshipType == RelationshipType::PendingIncoming
client->AcceptDiscordFriendRequest(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Discord friend request accepted!\n";
  }
});

// RelationshipHandle::GameRelationshipType == RelationshipType::PendingIncoming
client->AcceptGameFriendRequest(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Game friend request accepted!\n";
  }
});

```


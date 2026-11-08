# Reject incoming friend requests
Context: Discord developer reference: Reject incoming friend requests
[Source](managing-relationships-index.md) / [Previous source section](accept-incoming-friend-requests.md) / [Following source section](cancel-outgoing-friend-requests.md)
<a id="source-reject-incoming-friend-requests"></a>

### Reject Incoming Friend Requests

 Let players reject incoming friend requests represented by `RelationshipType::PendingIncoming`.

```
// Reject Incoming Friend Requests
// RelationshipHandle::DiscordRelationshipType == RelationshipType::PendingIncoming
client->RejectDiscordFriendRequest(userId,[](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Discord friend request rejected!\n";
  }
});

// RelationshipHandle::GameRelationshipType == RelationshipType::PendingIncoming
client->RejectGameFriendRequest(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Game friend request rejected!\n";
  }
});

```


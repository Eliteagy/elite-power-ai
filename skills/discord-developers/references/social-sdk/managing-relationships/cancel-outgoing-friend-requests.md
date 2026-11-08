# Cancel outgoing friend requests
Context: Discord developer reference: Cancel outgoing friend requests
[Source](managing-relationships-index.md) / [Previous source section](reject-incoming-friend-requests.md) / [Following source section](managing-existing-relationships.md)
<a id="source-cancel-outgoing-friend-requests"></a>

### Cancel Outgoing Friend Requests

 Let players cancel outgoing friend requests represented by `RelationshipType::PendingOutgoing`.

```
// Cancel Outgoing Friend Requests
// RelationshipHandle::DiscordRelationshipType == RelationshipType::PendingIncoming
client->CancelDiscordFriendRequest(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Discord friend request canceled!\n";
  }
});

// RelationshipHandle::GameRelationshipType == RelationshipType::PendingOutgoing
client->CancelGameFriendRequest(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Game friend request canceled!\n";
  }
});

```


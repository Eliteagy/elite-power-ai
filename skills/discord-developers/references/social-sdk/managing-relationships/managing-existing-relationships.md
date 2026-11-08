# Managing existing relationships
Context: Discord developer reference: Managing existing relationships
[Source](managing-relationships-index.md) / [Previous source section](cancel-outgoing-friend-requests.md) / [Following source section](blocking-users.md)
<a id="source-managing-existing-relationships"></a>

### Managing Existing Relationships

 Let players remove relationships with other users. Removal affects both users, ending their ability to see each other's online status or send messages.

```
// Removes any friendship between the current user and the target user.
// This function will remove BOTH any Discord friendship and any game friendship between the users.
client->RemoveDiscordAndGameFriend(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Discord and Game friendships removed!\n";
  }
});

// Removes any game friendship between the current user and the target user.
client->RemoveGameFriend(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 Game friendship removed!\n";
  }
});

```


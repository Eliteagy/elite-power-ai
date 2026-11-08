# Blocking users
Context: Discord developer reference: Blocking users
[Source](managing-relationships-index.md) / [Previous source section](managing-existing-relationships.md) / [Following source section](unblocking-users.md)
<a id="source-blocking-users"></a>

### Blocking Users

 Let players block another user so that user can no longer send friend invites, activity invites, or messages to them. Blocking also removes any existing relationship between the users. It is global across Discord and games: blocking in one game or in Discord blocks the user everywhere.

```
client->BlockUser(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 User blocked successfully!\n";
  }
});

```


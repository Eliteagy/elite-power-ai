# Unblocking users
Context: Discord developer reference: Unblocking users
[Source](managing-relationships-index.md) / [Previous source section](blocking-users.md) / [Following source section](next-steps.md)
<a id="source-unblocking-users"></a>

### Unblocking Users

 Let players unblock a user who is currently blocked. Unblocking does not recreate any relationship that existed before the block.

```
client->UnblockUser(userId, [](discordpp::ClientResult result) {
  if (result.Successful()) {
    std::cout << "🎮 User unblocked successfully!\n";
  }
});

```

---


# Relationship deleted callback
Context: Discord developer reference: Relationship deleted callback
[Source](creating-a-unified-friends-list-index.md) / [Owning endpoint, event, object or procedure conditions](monitor-changes-in-relationships.md) / [Previous source section](relationship-created-callback.md) / [Following source section](next-steps.md)
<a id="source-relationship-deleted-callback"></a>

#### Relationship Deleted Callback

 This can occur when a user rejects a friend request or removes a friend.

```
client->SetRelationshipDeletedCallback([&client](uint64_t userId, bool isDiscordRelationshipUpdate) {
    std::cout << "🔥 Relationship deleted: " << userId << std::endl;
    DisplayFriendsList(*client);
});

```

 The friends list can refresh automatically when relationships change, including adding a new friend, accepting a friend request, or blocking a user.

---


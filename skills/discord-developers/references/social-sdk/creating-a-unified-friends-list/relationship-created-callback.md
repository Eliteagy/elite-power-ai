# Relationship created callback
Context: Discord developer reference: Relationship created callback
[Source](creating-a-unified-friends-list-index.md) / [Owning endpoint, event, object or procedure conditions](monitor-changes-in-relationships.md) / [Following source section](relationship-deleted-callback.md)
<a id="source-relationship-created-callback"></a>

#### Relationship Created Callback

 This can occur when a user sends or accepts a friend invite, or blocks another user.

```
client->SetRelationshipCreatedCallback([&client](uint64_t userId, bool isDiscordRelationshipUpdate) {
    std::optional<discordpp::UserHandle> user = client->GetUser(userId);
    // if the userid is valid (which it should be), we can display the user's display name
    if(user) {
        std::cout << "🤝 Relationship created: " << user->DisplayName() << std::endl;
        DisplayFriendsList(*client);
    }
});

```


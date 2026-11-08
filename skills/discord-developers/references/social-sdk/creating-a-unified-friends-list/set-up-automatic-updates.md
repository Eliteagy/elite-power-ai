# Set up automatic updates
Context: Discord developer reference: Set up automatic updates
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](display-the-unified-friends-list.md) / [Following source section](approach-2-manually-fetching-relationships-and-users.md)
<a id="source-step-2-set-up-automatic-updates"></a>

### Step 2: Set Up Automatic Updates

 Use [`Client::SetRelationshipGroupsUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af12441ef091298f968075b7190851098) to keep the friends list current. The callback runs whenever a change could affect grouping, such as a friend coming online or going offline, or a relationship update caused by accepting a friend request or blocking a user.

```
// Set up the unified friends list update callback
client->SetRelationshipGroupsUpdatedCallback([&client](const uint64_t userId) {
    std::cout << "👥 Friends list updated for user: " << userId << std::endl;
    DisplayUnifiedFriendsList(client);
});

```

---


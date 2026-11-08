# Monitor changes to users
Context: Discord developer reference: Monitor changes to users
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](organize-relationships.md) / [Following source section](monitor-changes-in-relationships.md)
<a id="source-step-3-monitor-changes-to-users"></a>

### Step 3: Monitor Changes to Users

 Use [`Client::SetUserUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3559f375165acedc6d6677ef599b3a4a) to monitor user changes. The callback runs when user information changes, including name updates, presence transitions such as online or offline, or starting your game.

```
client->SetUserUpdatedCallback([&client](uint64_t userId) {
    std::cout << "👤 User updated: " << userId << std::endl;
    DisplayFriendsList(*client);
});

```

 The friends list can refresh automatically when a friend's presence changes, such as going online, going offline, or starting your game. Because [`UserHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1UserHandle.html#a587bcc838e42dc5c56f840a350070707) updates itself with the latest user information, it is usually enough for reading current user data. [`Client::SetUserUpdatedCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a3559f375165acedc6d6677ef599b3a4a) is useful when you need to re-sort the list or perform similar work.

---


# Monitor changes in relationships
Context: Discord developer reference: Monitor changes in relationships
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](monitor-changes-to-users.md) / [Following source section](relationship-created-callback.md)
<a id="source-step-4-monitor-changes-in-relationships"></a>

### Step 4: Monitor Changes in Relationships

 Set up two callbacks for relationship updates. These examples rebuild the friends list whenever a relationship changes. For better performance, maintain a collection of [`UserHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1UserHandle.html#a587bcc838e42dc5c56f840a350070707) objects and add or remove entries as relationships change.


# Thread membership
Context: Discord developer reference: Thread membership
[Source](threads-index.md) / [Previous source section](gateway-events.md) / [Following source section](syncing-for-the-current-user.md)
<a id="source-thread-membership"></a>

### Thread Membership

 Threads maintain explicit membership records. This data mainly supports two cases:
- Clients use *their own* [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) to derive read state and notification settings. Bots rarely need this directly, but it drives some of the sync behavior described here.
- Listing all users present in a thread.
 Membership is represented as an array of [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) objects. Each object has `id` for the thread ID, `user_id`, `join_timestamp`, and `flags`. The current `flags` only cover notification settings, though additional flags may be introduced later.


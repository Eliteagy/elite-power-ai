# Example thread channel
Context: Discord developer reference: Example thread channel
[Source](channel-objects-and-settings-index.md) / [Owning endpoint, event, object or procedure conditions](channel-object.md) / [Previous source section](example-guild-voice-channel.md) / [Following source section](followed-channel-structure.md)
<a id="source-example-thread-channel"></a>

###### Example Thread Channel

 [Threads](https://docs.discord.com/developers/topics/threads) may be `archived` or `active`. Archived threads are generally not mutable; before sending a message or adding a reaction, the thread must be unarchived. The API automatically unarchives a thread when a message is sent in that thread. Unlike ordinary channel updates, thread updates are synced only to users who can view the affected threads. A [guild create](https://docs.discord.com/developers/events/gateway-events#guild-create) payload includes only active threads visible to the current user. Threads in private channels remain private to members of that channel. Therefore, when access to a channel is gained, the API sends a [thread list sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) containing all active threads in that channel. Threads also have membership: users must be added before they can send messages there. Sending a message in a thread automatically adds the user to that thread. Guilds limit both active thread count and thread member count. After those limits are reached, new threads cannot be created or unarchived, and additional users cannot be added. Threads do not count toward the per-guild channel limit. The [threads](https://docs.discord.com/developers/topics/threads) topic provides additional detail.

```
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "parent_id": "41771983423143937",
  "owner_id": "41771983423143937",
  "name": "don't buy dota-2",
  "type": 11,
  "last_message_id": "155117677105512449",
  "message_count": 1,
  "member_count": 5,
  "rate_limit_per_user": 2,
  "thread_metadata": {
    "archived": false,
    "auto_archive_duration": 1440,
    "archive_timestamp": "2021-04-12T23:40:39.855793+00:00",
    "locked": false
  },
  "total_message_sent": 1
}

```


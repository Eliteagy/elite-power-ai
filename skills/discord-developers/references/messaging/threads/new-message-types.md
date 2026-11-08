# New message types
Context: Discord developer reference: New message types
[Source](threads-index.md) / [Previous source section](age-restricted-threads.md) / [Following source section](enumerating-threads.md)
<a id="source-new-message-types"></a>

### New Message Types

 Threads add some [message types](https://docs.discord.com/developers/resources/message#message-object-message-types) and reuse others:
- `RECIPIENT_ADD` and `RECIPIENT_REMOVE` are also sent when another user adds or removes someone from a thread
- `CHANNEL_NAME_CHANGE` is reused for thread name changes
- `THREAD_CREATED` is a new message in the parent `GUILD_TEXT` channel that tells users a thread was created. It is currently sent only when a `PUBLIC_THREAD` is created from an older message; the exact age remains TBD but is currently very small. The message has a [message reference](https://docs.discord.com/developers/resources/message#message-reference-structure) containing the thread's `guild_id` and `channel_id`, and its `content` is the thread `name`.
- `THREAD_STARTER_MESSAGE` is the first message in threads started from an existing parent-channel message. It contains only a [message reference](https://docs.discord.com/developers/resources/message#message-reference-structure) to the starter message.


# Forum and media channel fields
Context: Discord developer reference: Forum and media channel fields
[Source](threads-index.md) / [Previous source section](creating-threads-in-forum-and-media-channels.md) / [Following source section](forum-and-media-channel-thread-fields.md)
<a id="source-forum-and-media-channel-fields"></a>

### Forum and Media Channel Fields

 Several fields specific to thread-only channels are worth noting:
- `last_message_id` is the ID of the newest thread created in that channel. As with messages, Discord does not send `CHANNEL_UPDATE` when it changes, so apps should update it from [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create).
- `topic` is displayed as the Guidelines section in the Discord client.
- `rate_limit_per_user` controls how often threads can be created. Thread-only channels also have `default_thread_rate_limit_per_user`, which limits how frequently messages may be sent *inside a thread* and is copied to `rate_limit_per_user` when the thread is created.
- `available_tags` can be set during channel creation or update and determines which tags may be placed on individual threads through `applied_tags`.
- `flags` contains [channel flags](https://docs.discord.com/developers/resources/channel#channel-object-channel-flags) for a thread-only channel. Currently `REQUIRE_TAG` is the only supported value; it requires choosing a tag from `available_tags` when creating a thread.
 All channel fields, including fields for thread-only channels, are documented in the [Channel Object](https://docs.discord.com/developers/resources/channel#channel-object).


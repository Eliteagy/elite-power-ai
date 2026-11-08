# Forum and media channel thread fields
Context: Discord developer reference: Forum and media channel thread fields
[Source](threads-index.md) / [Previous source section](forum-and-media-channel-fields.md) / [Following source section](forum-and-media-channel-formatting.md)
<a id="source-forum-and-media-channel-thread-fields"></a>

### Forum and Media Channel Thread Fields

 A thread can be pinned in a thread-only channel, represented by the [`PINNED` flag](https://docs.discord.com/developers/resources/channel#channel-object-channel-flags) in the thread's `flags` field. A pinned thread has `(1 << 1)` set, and archiving it unsets that flag. Pinned threads do *not* auto-archive. For threads in thread-only channels, `message_count` and `total_message_sent` increase on `MESSAGE_CREATE` and decrease on `MESSAGE_DELETE` and `MESSAGE_DELETE_BULK`. No dedicated `CHANNEL_UPDATE` reports those counter changes, so apps should update them from the corresponding events. The full thread field set for thread-only channels is in the [channel resources documentation](https://docs.discord.com/developers/resources/channel#start-thread-in-forum-or-media-channel-jsonform-params).


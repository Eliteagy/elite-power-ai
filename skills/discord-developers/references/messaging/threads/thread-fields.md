# Thread fields
Context: Discord developer reference: Thread fields
[Source](threads-index.md) / [Previous source section](backwards-compatibility.md) / [Following source section](public-private-threads.md)
<a id="source-thread-fields"></a>

### Thread Fields

 Threads reuse or reinterpret several fields from the [channel object](https://docs.discord.com/developers/resources/channel#channel-object):
- `id`, `guild_id`, `type`, `name`, `last_message_id`, `last_pin_timestamp`, and `rate_limit_per_user` are reused
- `owner_id` now stores the ID of the user who created the thread
- `parent_id` now stores the ID of the parent `GUILD_TEXT` or `GUILD_ANNOUNCEMENT` channel
 Threads also expose several fields that ordinary channels do not:
- `member_count` is an approximate member count capped at 50; it is used only by Discord UI and is usually not useful for bots
- `message_count` and `total_message_sent` both count thread messages. Deleting a message decreases `message_count` but does not decrease `total_message_sent`. For threads created before July 1, 2022 both counters stop at 50.
- `thread_metadata` contains thread-only fields: `archived`, `archive_timestamp`, `auto_archive_duration`, and `locked`. `archive_timestamp` changes when a thread is created, archived, unarchived, or has `auto_archive_duration` changed.


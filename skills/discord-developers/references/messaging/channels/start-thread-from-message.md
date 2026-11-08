# Start thread from message
Context: Discord developer reference: Start thread from message
[Source](invites-permissions-and-threads-index.md) / [Previous source section](group-dm-remove-recipient.md) / [Following source section](start-thread-without-message.md)
<a id="source-start-thread-from-message"></a> <a id="source-json-params-2"></a>

### Start Thread from Message

  Create a thread from an existing message. Success returns a [channel](https://docs.discord.com/developers/resources/channel#channel-object); invalid parameters return 400 BAD REQUEST. Discord fires both [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) and [Message Update](https://docs.discord.com/developers/events/gateway-events#message-update) Gateway events. Calling from `GUILD_TEXT` creates a `PUBLIC_THREAD`; calling from `GUILD_ANNOUNCEMENT` creates an `ANNOUNCEMENT_THREAD`. It cannot be used on [`GUILD_FORUM`](https://docs.discord.com/developers/resources/channel#start-thread-in-forum-or-media-channel) or `GUILD_MEDIA`. The new thread's id matches the source message id, so each message can have only one thread. `X-Audit-Log-Reason` is supported.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| auto_archive_duration? | integer | After `auto_archive_duration` minutes without activity, the thread no longer appears in the channel list. Allowed values are 60, 1440, 4320, and 10080. |
| rate_limit_per_user? | ?integer | Seconds a user must wait before posting another message (0-21600). |


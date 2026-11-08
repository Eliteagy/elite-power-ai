# Start thread without message
Context: Discord developer reference: Start thread without message
[Source](invites-permissions-and-threads-index.md) / [Previous source section](start-thread-from-message.md) / [Following source section](start-thread-in-forum-or-media-channel.md)
<a id="source-start-thread-without-message"></a> <a id="source-json-params-3"></a>

### Start Thread without Message

  Create a thread that is not tied to an existing message. Success returns a [channel](https://docs.discord.com/developers/resources/channel#channel-object), while invalid parameters return 400 BAD REQUEST. Discord fires a [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) Gateway event. `X-Audit-Log-Reason` is supported.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| auto_archive_duration? | integer | After `auto_archive_duration` minutes without activity, the thread no longer appears in the channel list. Allowed values are 60, 1440, 4320, and 10080. |
| type?* | integer | Thread type to create. |
| invitable? | boolean | Whether non-moderators may add other non-moderators to the thread; available only for private thread creation. |
| rate_limit_per_user? | ?integer | Seconds a user must wait before posting another message (0-21600). |

 * `type` currently defaults to `PRIVATE_THREAD` to preserve the behavior from the initial thread documentation release. A later API version will make `type` required and remove the default.


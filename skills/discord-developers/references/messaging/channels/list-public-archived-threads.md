# List public archived threads
Context: Discord developer reference: List public archived threads
[Source](invites-permissions-and-threads-index.md) / [Previous source section](list-thread-members.md) / [Following source section](list-private-archived-threads.md)
<a id="source-list-public-archived-threads"></a> <a id="source-query-string-params-2"></a> <a id="source-response-body"></a>

### List Public Archived Threads

  Return public archived threads for the channel. On a `GUILD_TEXT` channel, the returned threads have [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) `PUBLIC_THREAD`. On a `GUILD_ANNOUNCEMENT` channel, the returned threads have [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) `ANNOUNCEMENT_THREAD`. Threads are sorted by descending `archive_timestamp`. Requires `READ_MESSAGE_HISTORY`.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| before? | ISO8601 timestamp | Return threads archived before this timestamp. |
| limit? | integer | Optional cap on the number of threads returned. |

###### Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of channel objects | the public, archived threads |
| members | array of thread members objects | Thread member object for each returned thread joined by the current user. |
| has_more | boolean | Whether another request may return more threads. |


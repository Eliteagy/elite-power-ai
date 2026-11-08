# List private archived threads
Context: Discord developer reference: List private archived threads
[Source](invites-permissions-and-threads-index.md) / [Previous source section](list-public-archived-threads.md) / [Following source section](list-joined-private-archived-threads.md)
<a id="source-list-private-archived-threads"></a> <a id="source-query-string-params-3"></a> <a id="source-response-body-1"></a>

### List Private Archived Threads

  Return archived threads in the channel with [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) `PRIVATE_THREAD`. Threads are sorted by descending `archive_timestamp`. Requires both `READ_MESSAGE_HISTORY` and `MANAGE_THREADS`.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| before? | ISO8601 timestamp | Return threads archived before this timestamp. |
| limit? | integer | Optional cap on the number of threads returned. |

###### Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of channel objects | the private, archived threads |
| members | array of thread members objects | Thread member object for each returned thread joined by the current user. |
| has_more | boolean | Whether another request may return more threads. |


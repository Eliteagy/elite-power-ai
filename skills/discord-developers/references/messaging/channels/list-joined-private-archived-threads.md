# List joined private archived threads
Context: Discord developer reference: List joined private archived threads
[Source](invites-permissions-and-threads-index.md) / [Previous source section](list-private-archived-threads.md)
<a id="source-list-joined-private-archived-threads"></a> <a id="source-query-string-params-4"></a> <a id="source-response-body-2"></a>

### List Joined Private Archived Threads

  Return archived [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) `PRIVATE_THREAD` threads in the channel that the user has joined. Threads are sorted by descending `id`. Requires `READ_MESSAGE_HISTORY`.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| before? | snowflake | returns threads before this id |
| limit? | integer | Optional cap on the number of threads returned. |

###### Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of channel objects | Private archived threads joined by the current user. |
| members | array of thread members objects | Thread member object for each returned thread joined by the current user. |
| has_more | boolean | Whether another request may return more threads. |

# List active guild threads
Context: Discord developer reference: List active guild threads
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](modify-guild-channel-positions.md) / [Following source section](get-guild-member.md)
<a id="source-list-active-guild-threads"></a> <a id="source-response-body"></a>

### List Active Guild Threads

  Responds with all active threads within the guild, covering public plus private threads. Threads are ordered by their `id`, in descending order.

###### Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of channel objects | the active threads |
| members | array of thread members objects | Thread member object record for each provided thread the current user has joined |


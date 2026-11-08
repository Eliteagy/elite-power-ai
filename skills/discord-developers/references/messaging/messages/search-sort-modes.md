# Search sort modes
Context: Discord developer reference: Search sort modes
[Source](attachments-and-message-creation-index.md) / [Owning endpoint, event, object or procedure conditions](search-guild-messages.md) / [Following source section](get-channel-message.md)
<a id="source-search-sort-modes"></a> <a id="source-response-body"></a>

###### Search Sort Modes

| Type | Description |
| --- | --- |
| timestamp | Sort by message creation time (default) |
| relevance | Sort by search-query relevance |

###### Response Body

| Field | Type | Description |
| --- | --- | --- |
| doing_deep_historical_index | boolean | whether the guild is running a deep historical indexing operation |
| documents_indexed? | integer | documents indexed during the current index operation, if one is running |
| total_results | integer | total results matching the query |
| messages [1] | array of message object arrays | nested message arrays matching the query |
| threads? | array of channel objects | threads containing the returned messages |
| members? | array of thread member objects | thread member object for each returned thread joined by the current user |

 [1] The nested array formerly supplied surrounding search-result context. Surrounding context is no longer returned.


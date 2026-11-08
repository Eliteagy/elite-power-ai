# Message call object
Context: Discord developer reference: Message call object
[Source](message-objects-and-embeds-index.md) / [Previous source section](message-interaction-metadata-object.md) / [Following source section](message-reference-structure.md)
<a id="source-message-call-object"></a> <a id="source-message-call-object-structure"></a>

### Message Call Object

 Details for the call attached to a private channel message.

###### Message Call Object Structure

| Field | Type | Description |
| --- | --- | --- |
| participants | array of snowflakes | array of user object ids for users who joined the call |
| ended_timestamp? | ?ISO8601 timestamp | time when call ended |


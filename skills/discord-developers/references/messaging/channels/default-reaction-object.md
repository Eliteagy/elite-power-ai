# Default reaction object
Context: Discord developer reference: Default reaction object
[Source](channel-objects-and-settings-index.md) / [Previous source section](thread-member-object.md) / [Following source section](forum-tag-object.md)
<a id="source-default-reaction-object"></a> <a id="source-default-reaction-structure"></a>

### Default Reaction Object

 Object specifying the emoji used as the default reaction option for a forum post. Exactly one of `emoji_id` or `emoji_name` must be provided.

###### Default Reaction Structure

| Field | Type | Description |
| --- | --- | --- |
| emoji_id | ?snowflake | ID of a guild custom emoji |
| emoji_name | ?string | unicode emoji character |


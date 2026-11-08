# Forum tag object
Context: Discord developer reference: Forum tag object
[Source](channel-objects-and-settings-index.md) / [Previous source section](default-reaction-object.md) / [Following source section](get-channel.md)
<a id="source-forum-tag-object"></a> <a id="source-forum-tag-structure"></a>

### Forum Tag Object

 Object representing a tag that can be applied to a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel.

###### Forum Tag Structure

 When updating a `GUILD_FORUM` or `GUILD_MEDIA` channel, each tag object in `available_tags` only needs `name`.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of the tag |
| name | string | tag name; 0-20 characters |
| moderated | boolean | whether only members with `MANAGE_THREADS` can add or remove this tag on threads |
| emoji_id | ?snowflake | ID of a guild custom emoji * |
| emoji_name | ?string | unicode emoji character * |

 * No more than one of `emoji_id` and `emoji_name` may contain a non-null value.


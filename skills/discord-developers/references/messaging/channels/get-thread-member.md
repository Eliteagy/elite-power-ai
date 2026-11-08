# Get thread member
Context: Discord developer reference: Get thread member
[Source](invites-permissions-and-threads-index.md) / [Previous source section](remove-thread-member.md) / [Following source section](list-thread-members.md)
<a id="source-get-thread-member"></a> <a id="source-query-string-params"></a>

### Get Thread Member

  Return a [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object for the specified user when that user belongs to the thread; otherwise return 404. If `with_member` is `true`, the thread member object includes a `member` field containing a [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) object.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with_member? | boolean | Whether the thread member should include a guild member object. |


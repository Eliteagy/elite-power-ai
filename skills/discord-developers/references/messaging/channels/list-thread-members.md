# List thread members
Context: Discord developer reference: List thread members
[Source](invites-permissions-and-threads-index.md) / [Previous source section](get-thread-member.md) / [Following source section](list-public-archived-threads.md)
<a id="source-list-thread-members"></a> <a id="source-query-string-params-1"></a>

### List Thread Members

  Beginning with API v11, this endpoint always returns paginated results. Before API v11, pagination can be opted into by setting `with_member` to `true`; see [the changelog](https://docs.discord.com/developers/change-log#thread-member-details-and-pagination). The response is an array of [thread members](https://docs.discord.com/developers/resources/channel#thread-member-object) for users in the thread. With `with_member` set to `true`, results are paginated and each thread member object includes a `member` field containing a [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) object. Access depends on whether the app has the `GUILD_MEMBERS` [Privileged Intent](https://docs.discord.com/developers/events/gateway#privileged-intents) enabled.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with_member? | boolean | Whether each thread member should include a guild member object. |
| after? | snowflake | Return thread members after this user ID. |
| limit? | integer | Maximum thread members to return, from 1-100. Defaults to 100. |


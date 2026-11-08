# Thread Member Details and Pagination

Date: 2023-01-09
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3376) · [Year index](INDEX.md)

<a id="source-thread-member-details-and-pagination"></a>




The [thread member object](https://docs.discord.com/developers/resources/channel#thread-member-object) gained a `member` field. That `member` value contains a [guild member object](https://docs.discord.com/developers/resources/guild#guild-member-object) and is included in returned thread member objects when `with_member` is `true` for [List Thread Members](https://docs.discord.com/developers/resources/channel#list-thread-members) (`GET /channels/<channel_id>/thread-members`) and [Get Thread Member](https://docs.discord.com/developers/resources/channel#get-thread-member) (`GET /channels/<channel_id>/thread-members/<user_id>`). Passing `with_member` as `true` also turns on pagination for [List Thread Members](https://docs.discord.com/developers/resources/channel#list-thread-members). With pagination, use `after` and `limit` to request later members and control result size. The default `limit` is 100.

<a id="source-upcoming-changes"></a>

#### Upcoming Changes

Beginning with API v11, [List Thread Members](https://docs.discord.com/developers/resources/channel#list-thread-members) (`GET /channels/<channel_id>/thread-members`) will always return paginated results, whether or not `with_member` is provided.

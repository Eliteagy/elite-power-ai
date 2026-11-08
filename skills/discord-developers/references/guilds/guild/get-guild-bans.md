# Get guild bans
Context: Discord developer reference: Get guild bans
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](remove-guild-member.md) / [Following source section](get-guild-ban.md)
<a id="source-get-guild-bans"></a> <a id="source-query-string-params-3"></a>

### Get Guild Bans

  Responds with a list of [ban](https://docs.discord.com/developers/resources/guild#ban-object) object records for the user accounts banned from this guild. The caller needs the `BAN_MEMBERS` permission.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| limit? | number | Count of user accounts to provide (up to maximum 1000) | 1000 |
| before? * | snowflake | consider only user accounts before given user id | null |
| after? * | snowflake | consider only user accounts after given user id | null |

 * Provide one user id to `before` and `after` for pagination. Users can always be provided in ascending order by `user.id`. Once both `before` and `after` are provided, only `before` is respected.


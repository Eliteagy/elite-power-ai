# List guild members
Context: Discord developer reference: List guild members
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](get-guild-member.md) / [Following source section](search-guild-members.md)
<a id="source-list-guild-members"></a> <a id="source-query-string-params-1"></a>

### List Guild Members

  Responds with a list of [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) object records that are member records for the guild. This route needs the `GUILD_MEMBERS` [Privileged Intent](https://docs.discord.com/developers/events/gateway#privileged-intents). Every parameter on this route is optional.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| limit | integer | max count of member records to provide (1-1000) | 1 |
| after | snowflake | Highest user id within the previous page | 0 |


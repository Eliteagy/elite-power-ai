# Search guild members
Context: Discord developer reference: Search guild members
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](list-guild-members.md) / [Following source section](add-guild-member.md)
<a id="source-search-guild-members"></a> <a id="source-query-string-params-2"></a>

### Search Guild Members

  Responds with a list of [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) object records whose username or nickname starts with a provided string. Every parameter to this route except for `query` are optional

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| query | string | Query string to match username(s) and nickname(s) against. |  |
| limit | integer | max count of member records to provide (1-1000) | 1 |


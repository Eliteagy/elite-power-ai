# Get guild
Context: Discord developer reference: Get guild
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](incidents-data-structure.md) / [Following source section](get-guild-example-response.md)
<a id="source-get-guild"></a> <a id="source-query-string-params"></a>

### Get Guild

  Responds using the [guild](https://docs.discord.com/developers/resources/guild#guild-object) object record for the supplied id. Once `with_counts` is set to `true`, this route can also provide `approximate_member_count` and `approximate_presence_count` for the guild.

###### Query String Params

| Field | Type | Description | Required | Default |
| --- | --- | --- | --- | --- |
| with_counts? | boolean | timestamp for once `true`, returns approximate member and presence counts for the guild | false | false |


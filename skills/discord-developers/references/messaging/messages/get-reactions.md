# Get reactions
Context: Discord developer reference: Get reactions
[Source](reactions-edits-and-pins-index.md) / [Previous source section](delete-user-reaction.md) / [Following source section](delete-all-reactions.md)
<a id="source-get-reactions"></a> <a id="source-query-string-params"></a> <a id="source-reaction-types"></a>

### Get Reactions

  Fetches users who reacted with the specified emoji. A successful response is an array of [user](https://docs.discord.com/developers/resources/user#user-object) objects. The `emoji` value must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding), or Discord returns `10014: Unknown Emoji`. Custom emoji must be encoded as `name:id`, using the emoji name and emoji id.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| type? | integer | The type of reaction | 0 |
| after? | snowflake | Return users after this user ID | absent |
| limit? | integer | Maximum users to return (1-100) | 25 |

###### Reaction Types

| Type | Value |
| --- | --- |
| NORMAL | 0 |
| BURST | 1 |


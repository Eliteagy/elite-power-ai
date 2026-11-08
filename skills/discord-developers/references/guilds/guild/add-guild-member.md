# Add guild member
Context: Discord developer reference: Add guild member
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](search-guild-members.md) / [Following source section](modify-guild-member.md)
<a id="source-add-guild-member"></a> <a id="source-json-params-3"></a>

### Add Guild Member

  Adds one user to that guild, provided you have a valid oauth2 access token for the user account using the `guilds.join` scope. Responds with a 201 Created using the [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) as this body, or 204 No Content once the user account is already one member for the guild. Emits one [Guild Member Add](https://docs.discord.com/developers/events/gateway-events#guild-member-add) Gateway event. For guilds using [Membership Screening](https://docs.discord.com/developers/resources/guild#membership-screening-object) enabled, this route can default to adding new member records as `pending` within the [guild member object](https://docs.discord.com/developers/resources/guild#guild-member-object). Members that are `pending` can have to complete membership screening before they become full member records that can talk. Every parameter to this route except for `access_token` are optional. This Authorization header must be a Bot token (belonging to that same application used for authorization), and the bot must be one member for that server with `CREATE_INSTANT_INVITE` permission.

###### JSON Params

| Field | Type | Description | Permission |
| --- | --- | --- | --- |
| access_token | string | Oauth2 access token granted using the `guilds.join` to that bot’s application for the user account you want to add to that guild |  |
| nick | string | Value assigned to user’s nickname to | MANAGE_NICKNAMES |
| roles | array of snowflakes | List of role ids that member is assigned | MANAGE_ROLES |
| mute | boolean | Indicates whether the user account is muted in voice channels | MUTE_MEMBERS |
| deaf | boolean | Indicates whether the user account is deafened in voice channels | DEAFEN_MEMBERS |


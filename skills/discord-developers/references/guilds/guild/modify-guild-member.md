# Modify guild member
Context: Discord developer reference: Modify guild member
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](add-guild-member.md) / [Following source section](modify-current-member.md)
<a id="source-modify-guild-member"></a> <a id="source-json-params-4"></a>

### Modify Guild Member

  Updates attributes of a [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object). Responds with a 200 OK using the [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) as the body. Emits a [Guild Member Update](https://docs.discord.com/developers/events/gateway-events#guild-member-update) Gateway event. Once the `channel_id` is set to null, this can force the target user to be disconnected from voice. Every parameter on this route is optional and nullable. Once moving member records to channels, the API user *must* have permissions to both connect to that channel and have the `MOVE_MEMBERS` permission. The `X-Audit-Log-Reason` header is accepted by this endpoint.

###### JSON Params

| Field | Type | Description | Permission |
| --- | --- | --- | --- |
| nick | string | Value assigned to user’s nickname to | MANAGE_NICKNAMES |
| roles | array of snowflakes | List of role ids that member is assigned | MANAGE_ROLES |
| mute | boolean | Indicates whether the user account is muted in voice channels. Will throw a 400 error once the user account is not in a voice channel | MUTE_MEMBERS |
| deaf | boolean | Indicates whether the user account is deafened in voice channels. Will throw a 400 error once the user account is not in a voice channel | DEAFEN_MEMBERS |
| channel_id | snowflake | ID for channel to move user to (if they are connected to voice) | MOVE_MEMBERS |
| communication_disabled_until | ISO8601 timestamp | timestamp for once the user’s timeout can expire and the user account can communicate within that server again (up to 28 days within this future), set to null to remove timeout. Will throw a 403 error once the user account has the ADMINISTRATOR permission or is the owner for the guild | MODERATE_MEMBERS |
| flags | integer | guild member flags | MANAGE_GUILD or MANAGE_ROLES or (MODERATE_MEMBERS and KICK_MEMBERS and BAN_MEMBERS) |


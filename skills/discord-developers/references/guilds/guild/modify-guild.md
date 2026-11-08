# Modify guild
Context: Discord developer reference: Modify guild
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](get-guild-preview.md) / [Following source section](get-guild-channels.md)
<a id="source-modify-guild"></a> <a id="source-json-params"></a>

### Modify Guild

  Updates a guild’s settings. The caller needs the `MANAGE_GUILD` permission. Responds using the updated [guild](https://docs.discord.com/developers/resources/guild#guild-object) object record after a successful request. Emits a [Guild Update](https://docs.discord.com/developers/events/gateway-events#guild-update) Gateway event. Every parameter on this route is optional. The `X-Audit-Log-Reason` header is accepted by this endpoint. Adding or removing the `COMMUNITY` [guild feature](https://docs.discord.com/developers/resources/guild#guild-object-guild-features) needs the `ADMINISTRATOR` permission.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | guild name |
| region | ?string | guild voice region id (deprecated) |
| verification_level | ?integer | verification level |
| default_message_notifications | ?integer | default message notification level |
| explicit_content_filter | ?integer | explicit content filter level |
| afk_channel_id | ?snowflake | id for afk channel |
| afk_timeout | integer | afk timeout in seconds, may be set to: 60, 300, 900, 1800, 3600 |
| icon | ?image data | Base64 1024x1024 png/jpeg/gif image for that server icon (can be animated gif timestamp for once the server has the `ANIMATED_ICON` feature) |
| splash | ?image data | Base64 16:9 png/jpeg image for that server splash (timestamp for once the server has the `INVITE_SPLASH` feature) |
| discovery_splash | ?image data | Base64 16:9 png/jpeg image for that server discovery splash (timestamp for once the server has the `DISCOVERABLE` feature) |
| banner | ?image data | Base64 16:9 png/jpeg image for that server banner (timestamp for once the server has the `BANNER` feature; may be animated gif timestamp for once the server has the `ANIMATED_BANNER` feature) |
| system_channel_id | ?snowflake | Channel id used for server notices such as welcome messages and boost events are posted |
| system_channel_flags | integer | system channel flags |
| rules_channel_id | ?snowflake | Channel id used for Community guilds display rules and/or guidelines |
| public_updates_channel_id | ?snowflake | Channel id used for admins and moderators of Community guilds get notices from Discord |
| preferred_locale | ?string | Preferred locale of a Community server used in server discovery and notices from Discord; default is “en-US” |
| features | array of guild feature strings | enabled guild features |
| description | ?string | the description for the guild |
| premium_progress_bar_enabled | boolean | Indicates whether the guild’s boost progress bar must be enabled |
| safety_alerts_channel_id | ?snowflake | Channel id used for admins and moderators of Community guilds get safety alerts from Discord |


# Guild object guild structure
Context: Discord developer reference: Guild object guild structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](guild.md) / [Following source section](guild-object-verification-level.md)
<a id="source-guild-object"></a> <a id="source-guild-structure"></a> <a id="source-default-message-notification-level"></a> <a id="source-explicit-content-filter-level"></a> <a id="source-mfa-level"></a>

### Guild Object

###### Guild Structure

 Fields specific to that `GUILD_CREATE` event are listed within the [Gateway Events documentation](https://docs.discord.com/developers/events/gateway-events#guild-create).
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | guild id |
| name | string | Guild name (2-100 characters, excluding trailing and leading whitespace) |
| icon | ?string | icon hash |
| icon_hash? | ?string | icon hash, provided once within the template object |
| splash | ?string | splash hash |
| discovery_splash | ?string | discovery splash hash; only present for guilds using the “DISCOVERABLE” feature |
| owner? * | boolean | true once the user account is the owner for the guild |
| owner_id | snowflake | id of owner |
| permissions? * | string | total permissions for the user account within that server (excludes overwrites and implicit permissions) |
| region? ** | ?string | voice region id for that server (deprecated) |
| afk_channel_id | ?snowflake | id of afk channel |
| afk_timeout | integer | afk timeout in seconds |
| widget_enabled? | boolean | true once the server widget is enabled |
| widget_channel_id? | ?snowflake | Channel id that the widget can generate an invite to, or `null` once set to no invite |
| verification_level | integer | verification level required for the guild |
| default_message_notifications | integer | default message notifications level |
| explicit_content_filter | integer | explicit content filter level |
| roles | array of role objects | roles in the guild |
| emojis | array of emoji objects | custom guild emojis |
| features | array of guild feature strings | enabled guild features |
| mfa_level | integer | required MFA level for the guild |
| application_id | ?snowflake | application id for that server creator once it is bot-created |
| system_channel_id | ?snowflake | Channel id used for server notices such as welcome messages and boost events are posted |
| system_channel_flags | integer | system channel flags |
| rules_channel_id | ?snowflake | Channel id used for Community guilds can display rules and/or guidelines |
| max_presences? | ?integer | Maximum count of presences for that server (`null` is always returned, apart from that largest of guilds) |
| max_members? | integer | Maximum count of member records for the guild |
| vanity_url_code | ?string | Vanity url code for the guild |
| description | ?string | the description of a guild |
| banner | ?string | banner hash |
| premium_tier | integer | premium tier (Server Boost level) |
| premium_subscription_count? | integer | Count of boosts this server currently has |
| preferred_locale | string | Preferred locale of one Community guild; used in server discovery and notices from Discord, and delivered in interactions; default is “en-US” |
| public_updates_channel_id | ?snowflake | Channel id used for admins and moderators of Community guilds get notices from Discord |
| max_video_channel_users? | integer | Maximum amount of user accounts in a video channel |
| max_stage_video_channel_users? | integer | Maximum amount of user accounts in a stage video channel |
| approximate_member_count? | integer | approximate count of member records in this guild, provided from that `GET /guilds/<id>` and `/users/@me/guilds` endpoints once `with_counts` is `true` |
| approximate_presence_count? | integer | approximate count of non-offline member records in this guild, provided from that `GET /guilds/<id>` and `/users/@me/guilds` endpoints once `with_counts` is `true` |
| welcome_screen? | welcome screen object | Welcome screen of a Community guild, shown to new members, provided in an Invite’s server object |
| nsfw_level | integer | guild age-restriction level |
| stickers? | array of sticker objects | custom guild stickers |
| premium_progress_bar_enabled | boolean | Indicates whether that server includes the boost progress bar enabled |
| safety_alerts_channel_id | ?snowflake | Channel id used for admins and moderators of Community guilds get safety alerts from Discord |
| incidents_data | ?incidents data object | Incidents data for this guild |

 * These fields are only emitted once using the [GET Current User Guilds](https://docs.discord.com/developers/resources/user#get-current-user-guilds) route and are relative to that requested user ** This field is deprecated plus is replaced by [channel.rtc_region](https://docs.discord.com/developers/resources/channel#channel-object-channel-structure)

###### Default Message Notification Level

| Key | Value | Description |
| --- | --- | --- |
| ALL_MESSAGES | 0 | Members get notifications for all messages by default |
| ONLY_MENTIONS | 1 | Members get notifications only for messages that @mention them by default |

###### Explicit Content Filter Level

| Level | Integer | Description |
| --- | --- | --- |
| DISABLED | 0 | Media content can not be scanned |
| MEMBERS_WITHOUT_ROLES | 1 | Media content emitted by member records without roles may be scanned |
| ALL_MEMBERS | 2 | Media content emitted by all member records may be scanned |

###### MFA Level

| Level | Integer | Description |
| --- | --- | --- |
| NONE | 0 | Guild includes no MFA/2FA requirement for moderation actions |
| ELEVATED | 1 | Guild includes a 2FA requirement for moderation actions |


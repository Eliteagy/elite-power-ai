# Modify channel
Context: Discord developer reference: Modify channel
[Source](channel-objects-and-settings-index.md) / [Previous source section](get-channel.md) / [Following source section](set-voice-channel-status.md)
<a id="source-modify-channel"></a> <a id="source-json-params-group-dm"></a> <a id="source-json-params-guild-channel"></a> <a id="source-json-params-thread"></a>

### Modify Channel

  Change a channel's settings. On success, returns a [channel](https://docs.discord.com/developers/resources/channel#channel-object); invalid parameters return 400 BAD REQUEST. Every parameter for this endpoint is optional. This endpoint supports the `X-Audit-Log-Reason` header.

###### JSON Params (Group DM)

 Triggers a [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) Gateway event.
| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| icon | binary | base64 encoded icon |

###### JSON Params (Guild channel)

 Requires `MANAGE_CHANNELS` in the guild. Triggers a [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) Gateway event. If the modified channel is a category, each changed child channel also receives its own [Channel Update](https://docs.discord.com/developers/events/gateway-events#channel-update) event. Modifying permission overwrites requires `MANAGE_ROLES`. A bot can allow or deny only permissions it already has in the guild or parent channel, when applicable, unless it has a `MANAGE_ROLES` overwrite in the channel.
| Field | Type | Description | Channel Type |
| --- | --- | --- | --- |
| name | string | 1-100 character channel name | All |
| type | integer | channel type; only text-to-announcement or announcement-to-text conversion is supported, and only in guilds with the "NEWS" feature | Text, Announcement |
| position | ?integer | channel position in the left-side list; matching positions are sorted by id | All |
| topic | ?string | channel topic with 0-1024 characters, or 0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels | Text, Announcement, Forum, Media |
| nsfw | ?boolean | whether the channel has age restrictions enabled | Text, Voice, Announcement, Stage, Forum, Media |
| rate_limit_per_user | ?integer | seconds a user must wait before another message, from 0-21600; bots and users with `BYPASS_SLOWMODE` are exempt | Text, Voice, Stage, Forum, Media |
| bitrate* | ?integer | voice or stage channel bitrate in bits per second; minimum 8000 | Voice, Stage |
| user_limit | ?integer | voice or stage channel user limit; maximum 99 for voice channels and 10,000 for stage channels, with 0 meaning unlimited | Voice, Stage |
| permission_overwrites** | ?array of partial overwrite objects | channel or category-specific permissions | All |
| parent_id | ?snowflake | ID of the channel's new parent category | Text, Voice, Announcement, Stage, Forum, Media |
| rtc_region | ?string | voice channel region ID; null means automatic | Voice, Stage |
| video_quality_mode | ?integer | camera video quality mode for the voice channel | Voice, Stage |
| default_auto_archive_duration | ?integer | default client-side duration, in minutes, used for newly created threads in the channel before auto-archiving after recent activity | Text, Announcement, Forum, Media |
| flags | integer | channel flags as a combined bitfield. Currently, `GUILD_FORUM` and `GUILD_MEDIA` support only `REQUIRE_TAG` (`1 << 4`). `HIDE_MEDIA_DOWNLOAD_OPTIONS` (`1 << 15`) is supported only by `GUILD_MEDIA` channels | Forum, Media |
| available_tags | array of tag objects | tags usable in a `GUILD_FORUM` or `GUILD_MEDIA` channel; maximum 20 | Forum, Media |
| default_reaction_emoji | ?default reaction object | emoji shown on the add reaction button for a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel | Forum, Media |
| default_thread_rate_limit_per_user | integer | initial `rate_limit_per_user` assigned to newly created threads in a channel; the value is copied when the thread is created and does not update live | Text, Forum, Media |
| default_sort_order | ?integer | default sort order type for posts in `GUILD_FORUM` and `GUILD_MEDIA` channels | Forum, Media |
| default_forum_layout | integer | default forum layout type for displaying posts in `GUILD_FORUM` channels | Forum |

 * Normal servers can set voice bitrate up to 96000, Boost level 1 servers up to 128000, Boost level 2 servers up to 256000, and Boost level 3 servers, or servers with the `VIP_REGIONS` [guild feature](https://docs.discord.com/developers/resources/guild#guild-object-guild-features), up to 384000. Stage channel bitrate can be up to 64000. ** In each overwrite object, `allow` and `deny` may be omitted or set to `null`; both cases default to `"0"`.

###### JSON Params (Thread)

 Setting `archived` to `false` requires only `SEND_MESSAGES` when `locked` is also `false`; otherwise `MANAGE_THREADS` is required. Triggers a [Thread Update](https://docs.discord.com/developers/events/gateway-events#thread-update) Gateway event. The thread must already have `archived` set to `false`, or the request must set it to `false`.
| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| archived | boolean | whether the thread is archived |
| auto_archive_duration | integer | after `auto_archive_duration` minutes without activity, the thread stops appearing in the channel list; allowed values are 60, 1440, 4320, 10080 |
| locked | boolean | whether the thread is locked; locked threads can be unarchived only by users with MANAGE_THREADS |
| invitable | boolean | whether non-moderators may add other non-moderators to the thread; available only for private threads |
| rate_limit_per_user | ?integer | seconds a user must wait before sending another message, from 0-21600; bots and users with `BYPASS_SLOWMODE` are exempt |
| flags? | integer | channel flags as a combined bitfield; `PINNED` can be set only on threads in forum and media channels |
| applied_tags? | array of snowflakes | IDs of tags applied to a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel; maximum 5 |


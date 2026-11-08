# Create guild channel
Context: Discord developer reference: Create guild channel
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](get-guild-channels.md) / [Following source section](modify-guild-channel-positions.md)
<a id="source-create-guild-channel"></a> <a id="source-json-params-1"></a>

### Create Guild Channel

  Creates a new [channel](https://docs.discord.com/developers/resources/channel#channel-object) object record for the guild. The caller needs the `MANAGE_CHANNELS` permission. Once setting permission overwrites, only permissions your bot has within that server may be allowed/denied. Setting `MANAGE_ROLES` permission in channel records is only possible for server administrators. Responds using the new [channel](https://docs.discord.com/developers/resources/channel#channel-object) object record after a successful request. Emits a [Channel Create](https://docs.discord.com/developers/events/gateway-events#channel-create) Gateway event. Every parameter on this route is optional and nullable excluding `name`. The `X-Audit-Log-Reason` header is accepted by this endpoint.

###### JSON Params

| Field | Type | Description | Channel Type |
| --- | --- | --- | --- |
| name | string | channel name (1-100 characters) | All |
| type | integer | the type of channel | All |
| topic | string | channel topic (0-1024 characters) | Text, Announcement, Forum, Media |
| bitrate* | integer | Voice or stage bitrate, measured in bits per second; min 8000 | Voice, Stage |
| user_limit | integer | User limit for the voice channel | Voice, Stage |
| rate_limit_per_user | integer | amount of seconds one user has to wait before sending another message (0-21600); bots, as a well as user accounts using the permission `BYPASS_SLOWMODE`, are unaffected | Text, Voice, Stage, Forum, Media |
| position | integer | Sort position for that channel (channels using the same position are sorted by id) | All |
| permission_overwrites** | array of partial overwrite objects | the channel’s permission overwrites | All |
| parent_id | snowflake | ID for the parent category for a channel | Text, Voice, Announcement, Stage, Forum, Media |
| nsfw | boolean | Indicates whether that channel is age-restricted | Text, Voice, Announcement, Stage, Forum |
| rtc_region | string | Voice region ID for voice or stage channels; `null` selects automatic routing | Voice, Stage |
| video_quality_mode | integer | Camera video quality mode for the voice channel | Voice, Stage |
| default_auto_archive_duration | integer | Client-side default archive duration, in minutes, for new threads created within the channel, in minutes, to automatically archive the thread after recent activity | Text, Announcement, Forum, Media |
| default_reaction_emoji | default reaction object | Emoji displayed by the add reaction button for a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel | Forum, Media |
| available_tags | array of tag objects | Set of tags that may be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel | Forum, Media |
| default_sort_order | integer | Default sort order type used for order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels | Forum, Media |
| default_forum_layout | integer | Default forum layout view used for display posts in `GUILD_FORUM` channels | Forum |
| default_thread_rate_limit_per_user | integer | Initial `rate_limit_per_user` to set on newly created threads in one channel. this field is copied to that thread at creation time and does not live update. | Text, Announcement, Forum, Media |

 * For voice channels, normal servers can set bitrate up to 96000, servers using Boost level 1 can set up to 128000, servers using Boost level 2 can set up to 256000, plus servers with Boost level 3 or this `VIP_REGIONS` [guild feature](https://docs.discord.com/developers/resources/guild#guild-object-guild-features) may set up to 384000. For stage channels, bitrate may be set up to 64000. ** In each overwrite object, this `allow` and `deny` keys may be omitted or set to `null`, which both default to `"0"`.


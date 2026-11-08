# Channel object
Context: Discord developer reference: Channel object
[Source](channel-objects-and-settings-index.md) / [Following source section](channel-object-channel-flags.md)
<a id="source-channel-part-1"></a> <a id="source-channel-object"></a> <a id="source-channel-structure"></a> <a id="source-channel-types"></a> <a id="source-video-quality-modes"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### Channel Object

 Describes a Discord channel, either in a guild or in DMs.

###### Channel Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of this channel |
| type | integer | the type of channel |
| guild_id? | snowflake | guild ID; this can be absent on some channel objects delivered through gateway guild dispatches |
| position? | integer | channel ordering position; when positions match, channels are ordered by id |
| permission_overwrites? | array of overwrite objects | permission overwrites explicitly set for members and roles |
| name? | ?string | channel name; 1-100 characters |
| topic? | ?string | channel topic; 0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA`, and 0-1024 characters for other channel types |
| nsfw? | boolean | whether the channel has age restrictions enabled |
| last_message_id? | ?snowflake | ID of the most recent message in this channel, or thread for `GUILD_FORUM` or `GUILD_MEDIA`; it might not identify a valid existing message or thread |
| bitrate? | integer | voice channel bitrate, measured in bits per second |
| user_limit? | integer | maximum number of users allowed in the voice channel |
| rate_limit_per_user?* | integer | seconds a user must wait before sending another message, from 0-21600; bots and users with `BYPASS_SLOWMODE` are exempt |
| recipients? | array of user objects | the recipients of the DM |
| icon? | ?string | group DM icon hash |
| owner_id? | snowflake | ID of the user who created the group DM or thread |
| application_id? | snowflake | application ID for the group DM creator when a bot created it |
| managed? | boolean | for group DM channels, whether an application manages the channel through the `gdm.join` OAuth2 scope |
| parent_id? | ?snowflake | for guild channels, parent category ID, where each parent category can hold up to 50 channels; for threads, ID of the text channel where the thread was created |
| last_pin_timestamp? | ?ISO8601 timestamp | timestamp for the most recent pinned message; may be `null` in events such as `GUILD_CREATE` when no message is pinned |
| rtc_region? | ?string | voice channel region ID; null means automatic |
| video_quality_mode? | integer | voice channel camera video quality mode; value is 1 if omitted |
| message_count?** | integer | thread message count, excluding the first message and deleted messages |
| member_count? | integer | approximate thread user count, capped at 50 |
| thread_metadata? | a thread metadata object | thread-only fields that other channel types do not need |
| member? | a thread member object | thread member object for the current user when that user has joined; included only by some API endpoints |
| default_auto_archive_duration? | integer | default minutes copied to new threads for auto-archive behavior; after that inactive period, threads stop appearing in the channel list; allowed values are 60, 1440, 4320, 10080 |
| permissions? | string | permissions computed for the invoking user in this channel, including overwrites; present only inside `resolved` interaction data and does not include implicit permissions, which may need a separate check |
| flags? | integer | channel flags represented as a combined bitfield |
| total_message_sent? | integer | total number of messages ever sent in a thread; this resembles `message_count` at message creation time but does not decrease after deletion |
| available_tags? | array of tag objects | tags available for use in a `GUILD_FORUM` or `GUILD_MEDIA` channel |
| applied_tags? | array of snowflakes | IDs for tags applied to a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel |
| default_reaction_emoji? | ?default reaction object | emoji displayed on the add reaction button for a thread in a `GUILD_FORUM` or `GUILD_MEDIA` channel |
| default_thread_rate_limit_per_user? | integer | initial `rate_limit_per_user` assigned to newly created threads in a channel; the value is copied when the thread is created and does not update live |
| default_sort_order? | ?integer | default sort order type for posts in `GUILD_FORUM` and `GUILD_MEDIA`; defaults to `null`, meaning no channel admin has chosen a preferred sort order |
| default_forum_layout? | integer | default forum layout view for posts in `GUILD_FORUM`; defaults to `0`, meaning no channel admin has set a layout view |

 * `rate_limit_per_user` also controls thread creation. During each `rate_limit_per_user` interval, users may send one message and create one thread. ** For threads created before July 1, 2022, message counts above 50 are inaccurate.

###### Channel Types

 Types 10, 11, and 12 are available only in API v9 or later.
| Type | ID | Description |
| --- | --- | --- |
| GUILD_TEXT | 0 | text channel in a server |
| DM | 1 | a direct message between users |
| GUILD_VOICE | 2 | voice channel in a server |
| GROUP_DM | 3 | direct message shared by multiple users |
| GUILD_CATEGORY | 4 | category used to organize up to 50 channels |
| GUILD_ANNOUNCEMENT | 5 | followable channel whose posts can be crossposted into another server; formerly news channels |
| ANNOUNCEMENT_THREAD | 10 | temporary sub-channel inside a GUILD_ANNOUNCEMENT channel |
| PUBLIC_THREAD | 11 | temporary sub-channel inside a GUILD_TEXT or GUILD_FORUM channel |
| PRIVATE_THREAD | 12 | temporary sub-channel inside a GUILD_TEXT channel, visible only to invited users and users with MANAGE_THREADS |
| GUILD_STAGE_VOICE | 13 | voice-style channel for audience events |
| GUILD_DIRECTORY | 14 | hub channel that contains the listed servers |
| GUILD_FORUM | 15 | channel that contains only threads |
| GUILD_MEDIA | 16 | channel that contains only threads and behaves similarly to `GUILD_FORUM` channels |

 * `GUILD_MEDIA` is still actively being developed. Do not build against behavior that is not documented here, because it can change without notice.

###### Video Quality Modes

| Mode | Value | Description |
| --- | --- | --- |
| AUTO | 1 | Discord selects the quality level for best performance |
| FULL | 2 | 720p |


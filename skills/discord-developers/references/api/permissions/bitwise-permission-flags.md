# Bitwise permission flags
Context: Discord developer reference: Bitwise permission flags
[Source](permissions-index.md) / [Previous source section](permissions.md) / [Following source section](permission-hierarchy.md)
<a id="source-bitwise-permission-flags"></a>

###### Bitwise Permission Flags

| Permission | Value | Description | Channel Type (Abbreviated) |
| --- | --- | --- | --- |
| CREATE_INSTANT_INVITE | `0x0000000000000001` `(1 << 0)` | Permits instant invite creation | T, V, S |
| KICK_MEMBERS * | `0x0000000000000002` `(1 << 1)` | Permits member kicks |  |
| BAN_MEMBERS * | `0x0000000000000004` `(1 << 2)` | Permits member bans |  |
| ADMINISTRATOR * | `0x0000000000000008` `(1 << 3)` | Grants every permission and ignores channel overwrites |  |
| MANAGE_CHANNELS * | `0x0000000000000010` `(1 << 4)` | Permits channel management and editing | T, V, S |
| MANAGE_GUILD * | `0x0000000000000020` `(1 << 5)` | Permits guild management and editing |  |
| ADD_REACTIONS | `0x0000000000000040` `(1 << 6)` | Permits adding new reactions to messages; existing reactions can still be used without this flag | T, V, S |
| VIEW_AUDIT_LOG | `0x0000000000000080` `(1 << 7)` | Permits audit log viewing |  |
| PRIORITY_SPEAKER | `0x0000000000000100` `(1 << 8)` | Permits priority speaker use in voice channels | V |
| STREAM | `0x0000000000000200` `(1 << 9)` | Permits going live | V, S |
| VIEW_CHANNEL | `0x0000000000000400` `(1 << 10)` | Permits seeing a channel, including reading text channels and joining voice channels | T, V, S |
| SEND_MESSAGES | `0x0000000000000800` `(1 << 11)` | Permits channel messages and forum thread creation, but not messages inside threads | T, V, S |
| SEND_TTS_MESSAGES | `0x0000000000001000` `(1 << 12)` | Permits `/tts` messages | T, V, S |
| MANAGE_MESSAGES * | `0x0000000000002000` `(1 << 13)` | Permits deleting messages sent by other users | T, V, S |
| EMBED_LINKS | `0x0000000000004000` `(1 << 14)` | Causes links from permitted users to auto-embed | T, V, S |
| ATTACH_FILES | `0x0000000000008000` `(1 << 15)` | Permits image and file uploads | T, V, S |
| READ_MESSAGE_HISTORY | `0x0000000000010000` `(1 << 16)` | Permits access to prior messages | T, V, S |
| MENTION_EVERYONE | `0x0000000000020000` `(1 << 17)` | Permits the `@everyone` and `@here` mentions for notifying all users or online users | T, V, S |
| USE_EXTERNAL_EMOJIS | `0x0000000000040000` `(1 << 18)` | Permits custom emoji use from other servers | T, V, S |
| VIEW_GUILD_INSIGHTS | `0x0000000000080000` `(1 << 19)` | Permits viewing guild insights |  |
| CONNECT | `0x0000000000100000` `(1 << 20)` | Permits joining voice channels | V, S |
| SPEAK | `0x0000000000200000` `(1 << 21)` | Permits speaking in voice channels | V |
| MUTE_MEMBERS | `0x0000000000400000` `(1 << 22)` | Permits muting members in voice channels | V, S |
| DEAFEN_MEMBERS | `0x0000000000800000` `(1 << 23)` | Permits deafening members in voice channels | V |
| MOVE_MEMBERS | `0x0000000001000000` `(1 << 24)` | Permits moving members between voice channels | V, S |
| USE_VAD | `0x0000000002000000` `(1 << 25)` | Permits voice-activity-detection in voice channels | V |
| CHANGE_NICKNAME | `0x0000000004000000` `(1 << 26)` | Permits changing one's own nickname |  |
| MANAGE_NICKNAMES | `0x0000000008000000` `(1 << 27)` | Permits changing nicknames for other users |  |
| MANAGE_ROLES * | `0x0000000010000000` `(1 << 28)` | Permits role management and editing | T, V, S |
| MANAGE_WEBHOOKS * | `0x0000000020000000` `(1 << 29)` | Permits webhook management and editing | T, V, S |
| MANAGE_GUILD_EXPRESSIONS * | `0x0000000040000000` `(1 << 30)` | Permits editing and deleting any user's emojis, stickers, and soundboard sounds |  |
| USE_APPLICATION_COMMANDS | `0x0000000080000000` `(1 << 31)` | Permits slash commands and context menu commands | T, V, S |
| REQUEST_TO_SPEAK | `0x0000000100000000` `(1 << 32)` | Permits requests to speak in stage channels | S |
| MANAGE_EVENTS | `0x0000000200000000` `(1 << 33)` | Permits editing and deleting scheduled events created by any user | V, S |
| MANAGE_THREADS * | `0x0000000400000000` `(1 << 34)` | Permits thread deletion, archiving, and access to all private threads | T |
| CREATE_PUBLIC_THREADS | `0x0000000800000000` `(1 << 35)` | Permits public and announcement thread creation | T |
| CREATE_PRIVATE_THREADS | `0x0000001000000000` `(1 << 36)` | Permits private thread creation | T |
| USE_EXTERNAL_STICKERS | `0x0000002000000000` `(1 << 37)` | Permits custom sticker use from other servers | T, V, S |
| SEND_MESSAGES_IN_THREADS | `0x0000004000000000` `(1 << 38)` | Permits messages inside threads | T |
| USE_EMBEDDED_ACTIVITIES | `0x0000008000000000` `(1 << 39)` | Permits Activities, meaning applications with the `EMBEDDED` flag | T, V |
| MODERATE_MEMBERS ** | `0x0000010000000000` `(1 << 40)` | Permits timing out users, blocking their chat, thread reaction, and voice or stage participation temporarily |  |
| VIEW_CREATOR_MONETIZATION_ANALYTICS * | `0x0000020000000000` `(1 << 41)` | Permits viewing role subscription insights |  |
| USE_SOUNDBOARD | `0x0000040000000000` `(1 << 42)` | Permits soundboard use in voice channels | V |
| CREATE_GUILD_EXPRESSIONS | `0x0000080000000000` `(1 << 43)` | Permits creating emojis, stickers, and soundboard sounds, plus editing and deleting items created by the current user |  |
| CREATE_EVENTS | `0x0000100000000000` `(1 << 44)` | Permits creating scheduled events, plus editing and deleting events created by the current user | V, S |
| USE_EXTERNAL_SOUNDS | `0x0000200000000000` `(1 << 45)` | Permits custom soundboard sound use from other servers | V |
| SEND_VOICE_MESSAGES | `0x0000400000000000` `(1 << 46)` | Permits voice message sending | T, V, S |
| SET_VOICE_CHANNEL_STATUS | `0x0001000000000000` `(1 << 48)` | Permits setting a voice channel status | V |
| SEND_POLLS | `0x0002000000000000` `(1 << 49)` | Permits poll sending | T, V, S |
| USE_EXTERNAL_APPS | `0x0004000000000000` `(1 << 50)` | Permits user-installed apps to send public responses; without it, users may still use those apps, but responses are ephemeral. This applies only to apps not installed on the server. | T, V, S |
| PIN_MESSAGES | `0x0008000000000000` `(1 << 51)` | Permits pinning and unpinning messages | T |
| BYPASS_SLOWMODE | `0x0010000000000000` `(1 << 52)` | Permits bypassing slowmode restrictions | T, V, S |

| Channel Type (Abbreviated) | Description | Channel Types |
| --- | --- | --- |
| T | Text | GUILD_TEXT, GUILD_ANNOUNCEMENT, GUILD_FORUM, GUILD_MEDIA |
| V | Voice | GUILD_VOICE |
| S | Stage | GUILD_STAGE_VOICE |

* These permissions require the owner account to use [two-factor authentication](https://docs.discord.com/developers/topics/oauth2#twofactor-authentication-requirement) when the guild has server-wide 2FA enabled. ** See [Permissions for Timed Out Members](https://docs.discord.com/developers/topics/permissions#permissions-for-timed-out-members) for temporary permission changes applied to timed out users. Client labels may differ from API permission names: "Manage Permissions" maps to MANAGE_ROLES, "Use Voice Activity" maps to USE_VAD, and "Timeout Members" maps to MODERATE_MEMBERS.


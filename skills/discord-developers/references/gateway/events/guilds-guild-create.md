# Guilds guild create
Context: Discord developer reference: Guilds guild create
[Source](channel-thread-and-message-events-index.md) / [Previous source section](entitlements-entitlement-delete.md) / [Following source section](guilds-guild-update.md)
<a id="source-guilds"></a> <a id="source-guild-create"></a> <a id="source-guild-create-extra-fields"></a>

### Guilds

#### Guild Create

 This event may arrive for three reasons:
1. During initial connection, the client uses it to lazily load and backfill all unavailable guilds listed by the [Ready](https://docs.discord.com/developers/events/gateway-events#ready) event. Guilds unavailable because of an outage instead produce a [Guild Delete](https://docs.discord.com/developers/events/gateway-events#guild-delete) event.
2. When a Guild becomes available to the client again.
3. When the current user joins a new Guild.
 If an outage is underway, the guild object in scenarios 1 and 3 can be flagged unavailable. The payload body can be:
- An available Guild: a [guild](https://docs.discord.com/developers/resources/guild#guild-object) object plus the extra fields listed below.
- An unavailable Guild: an [unavailable guild](https://docs.discord.com/developers/resources/guild#unavailable-guild-object) object.

###### Guild Create Extra Fields

| Field | Type | Description |
| --- | --- | --- |
| joined_at | ISO8601 timestamp | Time when this guild was joined |
| large | boolean | `true` when this is treated as a large guild |
| unavailable? | boolean | `true` when an outage makes this guild unavailable |
| member_count | integer | Total member count for this guild |
| voice_states | array of partial voice state objects | Current voice-channel member states; the `guild_id` key is not present |
| members | array of guild member objects | Users in the guild |
| channels | array of channel objects | Channels in the guild |
| threads | array of channel objects | Every active thread in the guild that the current user is allowed to view |
| presences | array of partial presence update objects | Member presences for the guild; when size exceeds `large threshold`, only non-offline members are included |
| stage_instances | array of stage instance objects | Stage instances in the guild |
| guild_scheduled_events | array of guild scheduled event objects | Scheduled events in the guild |
| soundboard_sounds | array of soundboard sound objects | Soundboard sounds in the guild |

 If your bot lacks the `GUILD_PRESENCES` [Gateway Intent](https://docs.discord.com/developers/events/gateway#gateway-intents), or the guild has more than 75k members, this event returns members and presences only for your bot and users in voice channels.


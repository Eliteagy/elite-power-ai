# Voice Channel Status and Start Time Documentation

Date: 2026-04-20
Categories: Documentation
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L713) · [Year index](INDEX.md)

<a id="source-voice-channel-status-and-start-time-documentation"></a>


Voice channel status has existed for some time; the endpoint, permission, Gateway events, and audit log events are now officially documented so apps can integrate with it. The [Set Voice Channel Status](https://docs.discord.com/developers/resources/channel#set-voice-channel-status) endpoint (`PUT /channels/{channel.id}/voice-status`) lets apps set a short string, up to 500 characters, that describes what is happening in a voice channel.

<a id="source-permission"></a>

### Permission

Setting a channel's status requires the `SET_VOICE_CHANNEL_STATUS` permission (`1 << 48`), now included in the [permissions](https://docs.discord.com/developers/topics/permissions) table. `MANAGE_CHANNELS` is also required when the bot user is outside that voice channel.

<a id="source-gateway-events"></a>

### Gateway Events

Voice channel status and voice session start time are temporary values and are not stored on the [channel](https://docs.discord.com/developers/resources/channel#channel-object) object. Apps read them by sending the [Request Channel Info](https://docs.discord.com/developers/events/gateway-events#request-channel-info) Gateway command, opcode `43`. Discord responds with a [Channel Info](https://docs.discord.com/developers/events/gateway-events#channel-info) event for guild channels that carries requested fields such as `status` and `voice_start_time`. Field changes are reported through two receive events:
- [Voice Channel Status Update](https://docs.discord.com/developers/events/gateway-events#voice-channel-status-update) - sent when a channel's status changes.
- [Voice Channel Start Time Update](https://docs.discord.com/developers/events/gateway-events#voice-channel-start-time-update) - sent when a voice session's start time changes.

<a id="source-audit-log"></a>

### Audit Log

Two [audit log events](https://docs.discord.com/developers/resources/audit-log#audit-log-events) record status changes: `VOICE_CHANNEL_STATUS_UPDATE` (`192`) and `VOICE_CHANNEL_STATUS_DELETE` (`193`). On `VOICE_CHANNEL_STATUS_UPDATE` entries, the new status is carried in a `status` field inside [Optional Audit Entry Info](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object-optional-audit-entry-info).

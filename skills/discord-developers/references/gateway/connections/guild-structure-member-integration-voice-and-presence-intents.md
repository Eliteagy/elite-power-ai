# Guild structure member integration voice and presence intents
Context: Keep each intent with its entire event list. Both phases must link identifying/version/privilege context5–12 and all star footnotes134; MESSAGE_CONTENT is not an individual event. Expose every intent name.
[Source](intents-members-and-sharding-index.md) / [Required complete example component](message-reaction-event-moderation-and-poll-intents.md) / [Exact example stage and preceding setup](list-of-intents.md) / [Identifying and intent version conditions](gateway-intents.md) / [Required privilege, event and version footnotes](list-of-intents.md)

```
GUILDS (1 << 0)
  - GUILD_CREATE
  - GUILD_UPDATE
  - GUILD_DELETE
  - GUILD_ROLE_CREATE
  - GUILD_ROLE_UPDATE
  - GUILD_ROLE_DELETE
  - CHANNEL_CREATE
  - CHANNEL_UPDATE
  - CHANNEL_DELETE
  - CHANNEL_PINS_UPDATE
  - THREAD_CREATE
  - THREAD_UPDATE
  - THREAD_DELETE
  - THREAD_LIST_SYNC
  - THREAD_MEMBER_UPDATE
  - THREAD_MEMBERS_UPDATE *
  - STAGE_INSTANCE_CREATE
  - STAGE_INSTANCE_UPDATE
  - STAGE_INSTANCE_DELETE
  - VOICE_CHANNEL_STATUS_UPDATE
  - VOICE_CHANNEL_START_TIME_UPDATE

GUILD_MEMBERS (1 << 1) **
  - GUILD_MEMBER_ADD
  - GUILD_MEMBER_UPDATE
  - GUILD_MEMBER_REMOVE
  - THREAD_MEMBERS_UPDATE *

GUILD_MODERATION (1 << 2)
  - GUILD_AUDIT_LOG_ENTRY_CREATE
  - GUILD_BAN_ADD
  - GUILD_BAN_REMOVE

GUILD_EXPRESSIONS (1 << 3)
  - GUILD_EMOJIS_UPDATE
  - GUILD_STICKERS_UPDATE
  - GUILD_SOUNDBOARD_SOUND_CREATE
  - GUILD_SOUNDBOARD_SOUND_UPDATE
  - GUILD_SOUNDBOARD_SOUND_DELETE
  - GUILD_SOUNDBOARD_SOUNDS_UPDATE

GUILD_INTEGRATIONS (1 << 4)
  - GUILD_INTEGRATIONS_UPDATE
  - INTEGRATION_CREATE
  - INTEGRATION_UPDATE
  - INTEGRATION_DELETE

GUILD_WEBHOOKS (1 << 5)
  - WEBHOOKS_UPDATE

GUILD_INVITES (1 << 6)
  - INVITE_CREATE
  - INVITE_DELETE

GUILD_VOICE_STATES (1 << 7)
  - VOICE_CHANNEL_EFFECT_SEND
  - VOICE_STATE_UPDATE

GUILD_PRESENCES (1 << 8) **
  - PRESENCE_UPDATE

```

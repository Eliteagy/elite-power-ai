# Message reaction typing scheduled event moderation and poll intents
Context: Keep each intent with its entire event list. Both phases must link identifying/version/privilege context5–12 and all star footnotes134; MESSAGE_CONTENT is not an individual event. Expose every intent name.
[Source](intents-members-and-sharding-index.md) / [Required complete example component](guild-structure-member-integration-voice-and-presence-intents.md) / [Exact example stage and preceding setup](list-of-intents.md) / [Identifying and intent version conditions](gateway-intents.md) / [Required privilege, event and version footnotes](list-of-intents.md)

```
GUILD_MESSAGES (1 << 9)
  - MESSAGE_CREATE
  - MESSAGE_UPDATE
  - MESSAGE_DELETE
  - MESSAGE_DELETE_BULK

GUILD_MESSAGE_REACTIONS (1 << 10)
  - MESSAGE_REACTION_ADD
  - MESSAGE_REACTION_REMOVE
  - MESSAGE_REACTION_REMOVE_ALL
  - MESSAGE_REACTION_REMOVE_EMOJI

GUILD_MESSAGE_TYPING (1 << 11)
  - TYPING_START

DIRECT_MESSAGES (1 << 12)
  - MESSAGE_CREATE
  - MESSAGE_UPDATE
  - MESSAGE_DELETE
  - CHANNEL_PINS_UPDATE

DIRECT_MESSAGE_REACTIONS (1 << 13)
  - MESSAGE_REACTION_ADD
  - MESSAGE_REACTION_REMOVE
  - MESSAGE_REACTION_REMOVE_ALL
  - MESSAGE_REACTION_REMOVE_EMOJI

DIRECT_MESSAGE_TYPING (1 << 14)
  - TYPING_START

MESSAGE_CONTENT (1 << 15) ***

GUILD_SCHEDULED_EVENTS (1 << 16)
  - GUILD_SCHEDULED_EVENT_CREATE
  - GUILD_SCHEDULED_EVENT_UPDATE
  - GUILD_SCHEDULED_EVENT_DELETE
  - GUILD_SCHEDULED_EVENT_USER_ADD
  - GUILD_SCHEDULED_EVENT_USER_REMOVE

AUTO_MODERATION_CONFIGURATION (1 << 20)
  - AUTO_MODERATION_RULE_CREATE
  - AUTO_MODERATION_RULE_UPDATE
  - AUTO_MODERATION_RULE_DELETE

AUTO_MODERATION_EXECUTION (1 << 21)
  - AUTO_MODERATION_ACTION_EXECUTION

GUILD_MESSAGE_POLLS (1 << 24)
  - MESSAGE_POLL_VOTE_ADD
  - MESSAGE_POLL_VOTE_REMOVE

DIRECT_MESSAGE_POLLS (1 << 25)
  - MESSAGE_POLL_VOTE_ADD
  - MESSAGE_POLL_VOTE_REMOVE

```

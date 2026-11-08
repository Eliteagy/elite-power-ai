# Backwards compatibility
Context: Discord developer reference: Backwards compatibility
[Source](threads-index.md) / [Previous source section](threads.md) / [Following source section](thread-fields.md)
<a id="source-backwards-compatibility"></a>

### Backwards Compatibility

 Threads require API v9 or later. Bots that stay below API v9 will miss most thread gateway events and events that occur inside threads, such as [Message Create](https://docs.discord.com/developers/events/gateway-events#message-create). API v8 bots still receive gateway events for Interactions. Events that may be omitted include, but are not limited to:
- MESSAGE_CREATE
- MESSAGE_DELETE
- MESSAGE_DELETE_BULK
- MESSAGE_REACTION_ADD
- MESSAGE_REACTION_REMOVE
- MESSAGE_REACTION_REMOVE_ALL
- MESSAGE_REACTION_REMOVE_EMOJI
- MESSAGE_UPDATE
- THREAD_CREATE
- THREAD_UPDATE
- THREAD_DELETE
- THREAD_MEMBER_UPDATE
- THREAD_MEMBERS_UPDATE


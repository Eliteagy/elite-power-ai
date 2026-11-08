# Messages
Context: Discord developer reference: Messages
[Source](channel-thread-and-message-events-index.md) / [Previous source section](invites-invite-delete.md) / [Following source section](messages-message-create.md)
<a id="source-messages"></a>

### Messages

 Ephemeral messages differ from persistent messages because they go directly to the user and the sending bot instead of through the guild channel. Therefore, ephemeral messages depend on the [`DIRECT_MESSAGES` intent](https://docs.discord.com/developers/events/gateway#list-of-intents), and their message object omits `guild_id` and `member`.


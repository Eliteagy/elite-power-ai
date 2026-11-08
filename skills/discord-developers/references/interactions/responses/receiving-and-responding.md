# Receiving and responding
Context: Discord developer reference: Receiving and responding
[Source](interaction-objects-and-responses-index.md) / [Following source section](interaction-object-interaction-structure.md)
<a id="source-receiving-and-responding-part-1"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

An **[Interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object)** is the payload sent to your application when someone invokes an application command or uses a message component. For [Slash Commands](https://docs.discord.com/developers/interactions/application-commands#slash-commands), it carries the submitted option values. For [User Commands](https://docs.discord.com/developers/interactions/application-commands#user-commands) and [Message Commands](https://docs.discord.com/developers/interactions/application-commands#message-commands), it includes the resolved user or message that was targeted. For [Message Components](https://docs.discord.com/developers/components/reference), it identifies the component that was activated. The payload also supplies trigger context such as `guild_id`, `channel`, `member`, and related fields; the full field set is described in the data models below.


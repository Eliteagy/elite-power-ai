# Changes to Slash Command Response Types and Flags

Date: 2021-03-05
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4064) · [Year index](INDEX.md)

<a id="source-changes-to-slash-command-response-types-and-flags"></a>


Interaction response types changed to better support application command designs:
- Type `2` `Acknowledge` has been deprecated
- Type `3` `ChannelMessage` has been deprecated
- Type `5` `AcknowledgeWithSource` was renamed to `DeferredChannelMessageWithSource`
These deprecated types will be removed and become breaking on **April 9, 2021**. `flags` is now documented on [InteractionApplicationCommandCallbackData](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-data-structure). Setting `flags` to `64` makes the interaction response ephemeral.

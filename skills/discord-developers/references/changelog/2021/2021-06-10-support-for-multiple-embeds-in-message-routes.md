# Support for Multiple Embeds in Message Routes

Date: 2021-06-10
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3996) · [Year index](INDEX.md)

<a id="source-support-for-multiple-embeds-in-message-routes"></a>


Message routes now accept an embeds array in addition to the old embed field. Bots can send up to 10 embeds per message, matching webhook behavior. The old embed field is deprecated; a later API version removes it after May 26, 2021.

<a id="source-buttons-and-message-components"></a>

### Buttons and Message Components

Message components are available with two initial components: layout-based `ActionRow` and buttons. Apps can include buttons on bot messages and interaction responses. See [Learn more about message components](https://docs.discord.com/developers/components/overview). This adds these fields and response types:
- Optional `components` field added to the [message object](https://docs.discord.com/developers/resources/message#message-object)
- New response types `6` and `7` added for [interaction responses](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type), valid only for component-based interactions

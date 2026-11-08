# Slash Commands and Interactions

Date: 2020-12-15
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4099) · [Year index](INDEX.md)

<a id="source-slash-commands-and-interactions"></a>


Slash Commands are available. See [Slash Commands](https://docs.discord.com/developers/interactions/application-commands) for the detailed documentation. Slash Commands add these webhook features:
- Webhooks can update previously sent messages from the same webhook with [Edit Webhook Message](https://docs.discord.com/developers/resources/webhook#edit-webhook-message) and [Delete Webhook Message](https://docs.discord.com/developers/resources/webhook#delete-webhook-message)
This PR documents the `application` field on the `READY` gateway event. It is a partial [application object](https://docs.discord.com/developers/resources/application#application-object) containing `id` and `flags`.

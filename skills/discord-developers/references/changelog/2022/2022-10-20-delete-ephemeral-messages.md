# Delete Ephemeral Messages

Date: 2022-10-20
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3597) · [Year index](INDEX.md)

<a id="source-delete-ephemeral-messages"></a>


Ephemeral interaction responses and followups can now be deleted with a valid interaction token through these endpoints:
- [`DELETE /webhooks/<application_id>/<interaction_token>/messages/@original`](https://docs.discord.com/developers/interactions/receiving-and-responding#delete-original-interaction-response)
- [`DELETE /webhooks/<application_id>/<interaction_token>/messages/<message_id>`](https://docs.discord.com/developers/interactions/receiving-and-responding#delete-followup-message)
Interaction tokens remain valid for up to 15 minutes after the interaction. See the [interaction documentation](https://docs.discord.com/developers/interactions/receiving-and-responding) for details.

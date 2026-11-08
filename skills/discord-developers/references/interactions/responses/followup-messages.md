# Followup messages
Context: Discord developer reference: Followup messages
[Source](interaction-objects-and-responses-index.md) / [Previous source section](interaction-callback.md) / [Following source section](endpoints.md)
<a id="source-followup-messages"></a>

### Followup Messages

 After the initial interaction response, you may need to send followup messages or modify the original response. Whether delivery was through gateway or outgoing webhook, these endpoints handle edits and followups:
- [`PATCH /webhooks/<application_id>/<interaction_token>/messages/@original`](https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response) edits the first response to an Interaction
- [`DELETE /webhooks/<application_id>/<interaction_token>/messages/@original`](https://docs.discord.com/developers/interactions/receiving-and-responding#delete-original-interaction-response) removes the first response to an Interaction
- [`POST /webhooks/<application_id>/<interaction_token>`](https://docs.discord.com/developers/interactions/receiving-and-responding#create-followup-message) creates an additional followup message
- [`PATCH /webhooks/<application_id>/<interaction_token>/messages/<message_id>`](https://docs.discord.com/developers/interactions/receiving-and-responding#edit-followup-message) edits a message sent with that `token`
 Interaction webhooks use the same rate-limit behavior as regular webhooks. Interaction tokens remain valid for **15 minutes**, so responses may be made during that window.


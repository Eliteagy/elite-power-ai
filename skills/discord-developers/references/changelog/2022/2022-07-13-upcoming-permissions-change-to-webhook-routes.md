# Upcoming Permissions Change to Webhook Routes

Date: 2022-07-13
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3716) · [Year index](INDEX.md)

<a id="source-upcoming-permissions-change-to-webhook-routes"></a>




On August 8th, 2022 Discord will start requiring `VIEW_CHANNEL (1 << 10)` on webhook routes that already require `MANAGE_WEBHOOKS (1 << 29)`, matching the documented permission model. Most applications should not be affected, but affected apps should update permissions for these routes:
- [`GET /webhooks/{webhook.id}`](https://docs.discord.com/developers/resources/webhook#get-webhook)
- [`DELETE /webhooks/{webhook.id}`](https://docs.discord.com/developers/resources/webhook#delete-webhook)
- [`PATCH /webhooks/{webhook.id}`](https://docs.discord.com/developers/resources/webhook#modify-webhook)
- [`GET /channels/{channel.id}/webhooks`](https://docs.discord.com/developers/resources/webhook#get-channel-webhooks)
- [`POST /channels/{channel.id}/webhooks`](https://docs.discord.com/developers/resources/webhook#create-webhook)

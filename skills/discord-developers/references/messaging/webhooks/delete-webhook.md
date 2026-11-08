# Delete webhook
Context: Discord developer reference: Delete webhook
[Source](webhook-index.md) / [Previous source section](modify-webhook-with-token.md) / [Following source section](delete-webhook-with-token.md)
<a id="source-delete-webhook"></a>

### Delete Webhook

  Permanently deletes a webhook. Requires `MANAGE_WEBHOOKS`. A successful request returns `204 No Content`. Discord emits a [Webhooks Update](https://docs.discord.com/developers/events/gateway-events#webhooks-update) Gateway event. This endpoint supports `X-Audit-Log-Reason`.


# Modify webhook
Context: Discord developer reference: Modify webhook
[Source](webhook-index.md) / [Previous source section](get-webhook-with-token.md) / [Following source section](modify-webhook-with-token.md)
<a id="source-modify-webhook"></a> <a id="source-json-params-1"></a>

### Modify Webhook

  Updates a webhook and returns the updated [webhook](https://docs.discord.com/developers/resources/webhook#webhook-object) object on success. Requires `MANAGE_WEBHOOKS`. Discord emits a [Webhooks Update](https://docs.discord.com/developers/events/gateway-events#webhooks-update) Gateway event. Every parameter is optional. This endpoint supports `X-Audit-Log-Reason`.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | webhook default name |
| avatar | ?image data | default avatar image for the webhook |
| channel_id | snowflake | new channel id to move this webhook into |


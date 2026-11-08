# Create webhook
Context: Discord developer reference: Create webhook
[Source](webhook-index.md) / [Previous source section](example-channel-follower-webhook.md) / [Following source section](get-channel-webhooks.md)
<a id="source-create-webhook"></a> <a id="source-json-params"></a>

### Create Webhook

  Creates a webhook and returns a [webhook](https://docs.discord.com/developers/resources/webhook#webhook-object) object if successful. The caller needs `MANAGE_WEBHOOKS`. Discord emits a [Webhooks Update](https://docs.discord.com/developers/events/gateway-events#webhooks-update) Gateway event. Invalid webhook `name` values produce an error. A name is valid when:
- It does not include `clyde` or `discord`, ignoring case
- It follows the [Usernames and Nicknames](https://docs.discord.com/developers/resources/user#usernames-and-nicknames) nickname rules, except webhook names may be up to 80 characters
 This endpoint accepts `X-Audit-Log-Reason`.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the webhook (1-80 characters) |
| avatar? | ?image data | default avatar image for the webhook |


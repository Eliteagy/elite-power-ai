# Get webhook message
Context: Discord developer reference: Get webhook message
[Source](webhook-index.md) / [Previous source section](execute-git-hub-compatible-webhook.md) / [Following source section](edit-webhook-message.md)
<a id="source-get-webhook-message"></a> <a id="source-query-string-params-3"></a>

### Get Webhook Message

  Fetches a webhook message previously sent with the same token. Success returns a [message](https://docs.discord.com/developers/resources/message#message-object) object.

###### Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread_id | snowflake | id of the thread containing the message | false |


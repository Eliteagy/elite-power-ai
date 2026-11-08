# Execute slack compatible webhook
Context: Discord developer reference: Execute slack compatible webhook
[Source](webhook-index.md) / [Previous source section](execute-webhook.md) / [Following source section](execute-git-hub-compatible-webhook.md)
<a id="source-execute-slack-compatible-webhook"></a> <a id="source-query-string-params-1"></a>

### Execute Slack-Compatible Webhook

  See [Slack's documentation](https://api.slack.com/incoming-webhooks) for more information. Discord does not support Slack's `channel`, `icon_emoji`, `mrkdwn`, or `mrkdwn_in` properties.

###### Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread_id | snowflake | thread id where the message should be sent | false |
| wait | boolean | waits for Discord to confirm message send before responding; defaults to `true`; when `false`, an unsaved message does not return an error | false |


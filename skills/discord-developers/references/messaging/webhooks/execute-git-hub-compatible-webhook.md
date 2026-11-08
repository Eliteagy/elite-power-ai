# Execute git hub compatible webhook
Context: Discord developer reference: Execute git hub compatible webhook
[Source](webhook-index.md) / [Previous source section](execute-slack-compatible-webhook.md) / [Following source section](get-webhook-message.md)
<a id="source-execute-github-compatible-webhook"></a> <a id="source-query-string-params-2"></a>

### Execute GitHub-Compatible Webhook

  [Add a new webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) in the GitHub repository settings and set this endpoint as the “Payload URL.” To choose which events reach the Discord channel, select “Let me select individual events” and then pick events for the webhook. Supported [events](https://docs.github.com/en/webhooks/webhook-events-and-payloads) are `commit_comment`, `create`, `delete`, `fork`, `issue_comment`, `issues`, `member`, `public`, `pull_request`, `pull_request_review`, `pull_request_review_comment`, `push`, `release`, `watch`, `check_run`, `check_suite`, `discussion`, and `discussion_comment`.

###### Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread_id | snowflake | thread id where the message should be sent | false |
| wait | boolean | waits for Discord to confirm message send before responding; defaults to `true`; when `false`, an unsaved message does not return an error | false |


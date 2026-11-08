# Webhook object
Context: Discord developer reference: Webhook object
[Source](webhook-index.md) / [Previous source section](webhook.md) / [Following source section](example-channel-follower-webhook.md)
<a id="source-webhook-object"></a> <a id="source-webhook-structure"></a> <a id="source-webhook-types"></a> <a id="source-example-incoming-webhook"></a>

### Webhook Object

 Used to represent a webhook.

###### Webhook Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of the webhook |
| type | integer | the type of the webhook |
| guild_id? | ?snowflake | guild id associated with this webhook, when present |
| channel_id | ?snowflake | channel id associated with this webhook, when present |
| user? | user object | user that created the webhook; omitted when retrieving a webhook by token |
| name | ?string | webhook default name |
| avatar | ?string | webhook default avatar hash |
| token? | string | secure webhook token, returned for Incoming Webhooks |
| application_id | ?snowflake | bot or OAuth2 application that created the webhook |
| source_guild? * | partial guild object | guild for the followed channel, returned for Channel Follower Webhooks |
| source_channel? * | partial channel object | channel followed by this webhook, returned for Channel Follower Webhooks |
| url? | string | URL for executing the webhook, returned by the webhooks OAuth2 flow |

 * These fields are missing if the creator of the webhook no longer has access to the guild containing the followed channel

###### Webhook Types

 These webhook types exclude [webhook events](https://docs.discord.com/developers/events/webhook-events), which are outgoing webhooks Discord sends to your app. See [Webhook Events](https://docs.discord.com/developers/events/webhook-events).
| Value | Name | Description |
| --- | --- | --- |
| 1 | Incoming | Incoming Webhooks use a generated token to send messages into channels |
| 2 | Channel Follower | Channel Follower Webhooks are internal Channel Following webhooks that repost new messages into channels |
| 3 | Application | Application webhooks are used for Interactions |

###### Example Incoming Webhook

```
{
  "name": "test webhook",
  "type": 1,
  "channel_id": "199737254929760256",
  "token": "3d89bb7572e0fb30d8128367b3b1b44fecd1726de135cbe28a41f8b2f777c372ba2939e72279b94526ff5d1bd4358d65cf11",
  "avatar": null,
  "guild_id": "199737254929760256",
  "id": "223704706495545344",
  "application_id": null,
  "user": {
    "username": "test",
    "discriminator": "7479",
    "id": "190320984123768832",
    "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
    "public_flags": 131328
  }
}

```


# Commands and events notification create
Context: Discord developer reference: Commands and events notification create
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](speaking-argument-structure.md) / [Following source section](commands-and-events-activity-join.md)
<a id="source-notification_create"></a> <a id="source-notification-create-dispatch-data-structure"></a> <a id="source-example-notification-create-dispatch-payload"></a>

#### NOTIFICATION_CREATE

 Takes no arguments. Requires the `rpc.notifications.read` [OAuth2 scope](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes).

###### Notification Create Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | id of the channel where the notification occurred |
| message | message object | message that generated this notification |
| icon_url | string | icon url of the notification |
| title | string | title of the notification |
| body | string | body of the notification |

###### Example Notification Create Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "channel_id": "199737254929760256",
    "message": {
      "id": "199743874640379904",
      "blocked": false,
      "content": "test",
      "content_parsed": [
        {
          "content": "test",
          "type": "text"
        }
      ],
      "author_color": "#ffffff",
      "edited_timestamp": null,
      "timestamp": "2016-07-05T04:30:50.776Z",
      "tts": false,
      "mentions": [],
      "mention_roles": [],
      "mention_everyone": false,
      "embeds": [],
      "attachments": [],
      "type": 0,
      "pinned": false,
      "author": {
        "id": "190320984123768832",
        "username": "test user 2",
        "discriminator": "7479",
        "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
        "bot": false
      }
    },
    "icon_url": "https://cdn.discordapp.com/avatars/155607406007681024/8ab559b8286e48270c04471ae382cd9d.jpg",
    "title": "test_user (#general)",
    "body": "test message"
  },
  "evt": "NOTIFICATION_CREATE"
}

```


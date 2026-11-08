# Message create message update message delete
Context: Discord developer reference: Message create message update message delete
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](voice-connection-status.md) / [Following source section](speaking-argument-structure.md)
<a id="source-message_createmessage_updatemessage_delete"></a> <a id="source-message-argument-structure"></a> <a id="source-example-message-dispatch-payload"></a>

#### MESSAGE_CREATE/MESSAGE_UPDATE/MESSAGE_DELETE

 Dispatches message objects. For deletions, the message object contains only the id.

###### Message Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | channel id to subscribe to for updates |

###### Example Message Dispatch Payload

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
    }
  },
  "evt": "MESSAGE_CREATE"
}

```


# Example channel follower webhook
Context: Discord developer reference: Example channel follower webhook
[Source](webhook-index.md) / [Owning endpoint, event, object or procedure conditions](webhook-object.md) / [Following source section](create-webhook.md)
<a id="source-example-channel-follower-webhook"></a> <a id="source-example-application-webhook"></a>

###### Example Channel Follower Webhook

```
{
  "type": 2,
  "id": "752831914402115456",
  "name": "Guildy name",
  "avatar": "bb71f469c158984e265093a81b3397fb",
  "channel_id": "561885260615255432",
  "guild_id": "56188498421443265",
  "application_id": null,
  "source_guild": {
    "id": "56188498421476534",
    "name": "Guildy name",
    "icon": "bb71f469c158984e265093a81b3397fb"
  },
  "source_channel": {
    "id": "5618852344134324",
    "name": "announcements"
  },
  "user": {
    "username": "test",
    "discriminator": "7479",
    "id": "190320984123768832",
    "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
    "public_flags": 131328
  }
}

```

###### Example Application Webhook

```
{
  "type": 3,
  "id": "658822586720976555",
  "name": "Clyde",
  "avatar": "689161dc90ac261d00f1608694ac6bfd",
  "channel_id": null,
  "guild_id": null,
  "application_id": "658822586720976555"
}

```


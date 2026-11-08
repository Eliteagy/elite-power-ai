# Example invite object
Context: Discord developer reference: Example invite object
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Following source section](invite-metadata-object.md)
<a id="source-example-invite-object"></a>

###### Example Invite Object

```
{
  "type": 0,
  "code": "0vCdhLbwjZZTWZLD",
  "guild": {
    "id": "165176875973476352",
    "name": "CS:GO Fraggers Only",
    "splash": null,
    "banner": null,
    "description": "Very good description",
    "icon": null,
    "features": ["NEWS", "DISCOVERABLE"],
    "verification_level": 2,
    "vanity_url_code": null,
    "nsfw_level": 0,
    "premium_subscription_count": 5
  },
  "channel": {
    "id": "165176875973476352",
    "name": "illuminati",
    "type": 0
  },
  "inviter": {
    "id": "115590097100865541",
    "username": "speed",
    "avatar": "deadbeef",
    "discriminator": "7653",
    "public_flags": 131328
  },
  "target_type": 1,
  "target_user": {
    "id": "165176875973476352",
    "username": "bob",
    "avatar": "deadbeef",
    "discriminator": "1234",
    "public_flags": 64
  }
}

```


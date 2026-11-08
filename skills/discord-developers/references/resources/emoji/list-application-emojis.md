# List application emojis
Context: Discord developer reference: List application emojis
[Source](../emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](emoji-object.md) / [Previous source section](delete-guild-emoji.md) / [Following source section](get-application-emoji.md)
<a id="source-list-application-emojis"></a>

### List Application Emojis

  Returns an object whose `items` key contains [emoji](https://docs.discord.com/developers/resources/emoji#emoji-object) objects for the application. Each item includes a `user` object for the team member who uploaded it through application settings or the bot user that uploaded it through the API.

```
{
  "items": [
    {
      "id": "41771983429993937",
      "name": "LUL",
      "roles": [],
      "user": {
        "username": "Luigi",
        "discriminator": "0002",
        "id": "96008815106887111",
        "avatar": "5500909a3274e1812beb4e8de6631111",
        "public_flags": 131328
      },
      "require_colons": true,
      "managed": false,
      "animated": false
    }
  ]
}

```


# Unavailable guild object
Context: Discord developer reference: Unavailable guild object
[Source](guild-objects-and-configuration-index.md) / [Previous source section](mutable-guild-features.md) / [Following source section](guild-preview-structure.md)
<a id="source-unavailable-guild-object"></a> <a id="source-example-unavailable-guild"></a>

### Unavailable Guild Object

 A partial [guild](https://docs.discord.com/developers/resources/guild#guild-object) object. Represents an Offline Guild, or one Guild whose information has not already been provided through [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) events during this Gateway connect.

###### Example Unavailable Guild

```
{
  "id": "41771983423143937",
  "unavailable": true
}

```


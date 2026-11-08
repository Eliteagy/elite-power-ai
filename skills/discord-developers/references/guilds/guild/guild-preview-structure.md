# Guild preview structure
Context: Discord developer reference: Guild preview structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](unavailable-guild-object.md) / [Following source section](guild-widget-settings-structure.md)
<a id="source-guild-preview-object"></a> <a id="source-guild-preview-structure"></a> <a id="source-example-guild-preview"></a>

### Guild Preview Object

###### Guild Preview Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | guild id |
| name | string | guild name (2-100 characters) |
| icon | ?string | icon hash |
| splash | ?string | splash hash |
| discovery_splash | ?string | discovery splash hash |
| emojis | array of emoji objects | custom guild emojis |
| features | array of guild feature strings | enabled guild features |
| approximate_member_count | integer | approximate count of member records in this guild |
| approximate_presence_count | integer | approximate count of online member records in this guild |
| description | ?string | the description for the guild |
| stickers | array of sticker objects | custom guild stickers |

###### Example Guild Preview

```
{
  "id": "197038439483310086",
  "name": "Discord Testers",
  "icon": "f64c482b807da4f539cff778d174971c",
  "splash": null,
  "discovery_splash": null,
  "emojis": [],
  "features": [
    "DISCOVERABLE",
    "VANITY_URL",
    "ANIMATED_ICON",
    "INVITE_SPLASH",
    "NEWS",
    "COMMUNITY",
    "BANNER",
    "VERIFIED",
    "MORE_EMOJI"
  ],
  "approximate_member_count": 60814,
  "approximate_presence_count": 20034,
  "description": "The official place to report Discord Bugs!",
  "stickers": []
}

```


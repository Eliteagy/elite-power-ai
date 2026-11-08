# Welcome screen structure
Context: Discord developer reference: Welcome screen structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](ban-object-ban-structure.md) / [Following source section](guild-onboarding-object.md)
<a id="source-welcome-screen-object"></a> <a id="source-welcome-screen-structure"></a> <a id="source-welcome-screen-channel-structure"></a> <a id="source-example-welcome-screen"></a>

### Welcome Screen Object

###### Welcome Screen Structure

| Field | Type | Description |
| --- | --- | --- |
| description | ?string | Server description shown within the welcome screen |
| welcome_channels | List of welcome screen channel objects | Channels shown within the welcome screen, up to 5 |

###### Welcome Screen Channel Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | the channel’s id |
| description | string | Description shown for the channel |
| emoji_id | ?snowflake | Emoji id, once the emoji is custom |
| emoji_name | ?string | Emoji name once custom, the unicode character once standard, or `null` once no emoji is set |

###### Example Welcome Screen

```
{
  "description": "Discord Developers is a place to learn about Discord's API, bots, and SDKs and integrations. This is NOT a general Discord support server.",
  "welcome_channels": [
    {
      "channel_id": "697138785317814292",
      "description": "Follow for official Discord API updates",
      "emoji_id": null,
      "emoji_name": "📡"
    },
    {
      "channel_id": "697236247739105340",
      "description": "Get help with Bot Verifications",
      "emoji_id": null,
      "emoji_name": "📸"
    },
    {
      "channel_id": "697489244649816084",
      "description": "Create amazing things with Discord's API",
      "emoji_id": null,
      "emoji_name": "🔬"
    },
    {
      "channel_id": "613425918748131338",
      "description": "Integrate Discord into your game",
      "emoji_id": null,
      "emoji_name": "🎮"
    },
    {
      "channel_id": "646517734150242346",
      "description": "Find more places to help you on your quest",
      "emoji_id": null,
      "emoji_name": "🔦"
    }
  ]
}

```


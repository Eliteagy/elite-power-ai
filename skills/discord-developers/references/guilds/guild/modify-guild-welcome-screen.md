# Modify guild welcome screen
Context: Discord developer reference: Modify guild welcome screen
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-welcome-screen.md) / [Following source section](get-guild-onboarding.md)
<a id="source-modify-guild-welcome-screen"></a> <a id="source-json-params-3"></a>

### Modify Guild Welcome Screen

  Update the guild's [Welcome Screen](https://docs.discord.com/developers/resources/guild#welcome-screen-object). The caller needs `MANAGE_GUILD`. A successful call returns the updated [Welcome Screen](https://docs.discord.com/developers/resources/guild#welcome-screen-object) object and may emit a [Guild Update](https://docs.discord.com/developers/events/gateway-events#guild-update) Gateway event. All parameters are optional and nullable, and `X-Audit-Log-Reason` is supported.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| enabled | boolean | whether the welcome screen is active |
| welcome_channels | array containing welcome screen channel objects | welcome screen channels and the display settings for each one |
| description | string | server description displayed on the welcome screen |


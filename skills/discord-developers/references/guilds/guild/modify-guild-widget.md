# Modify guild widget
Context: Discord developer reference: Modify guild widget
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-widget-settings.md) / [Following source section](get-guild-widget.md)
<a id="source-modify-guild-widget"></a>

### Modify Guild Widget

  Update the guild's [guild widget settings](https://docs.discord.com/developers/resources/guild#guild-widget-settings-object) object. Any JSON attribute can be provided and changed. The operation requires `MANAGE_GUILD`, returns the updated [guild widget settings](https://docs.discord.com/developers/resources/guild#guild-widget-settings-object) object, may emit a [Guild Update](https://docs.discord.com/developers/events/gateway-events#guild-update) Gateway event, and supports `X-Audit-Log-Reason`.


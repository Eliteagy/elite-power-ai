# Delete guild integration
Context: Discord developer reference: Delete guild integration
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-integrations.md) / [Following source section](get-guild-widget-settings.md)
<a id="source-delete-guild-integration"></a>

### Delete Guild Integration

  Remove the guild's attached [integration](https://docs.discord.com/developers/resources/guild#integration-object). Related webhooks are deleted, and any associated bot is kicked. The call requires `MANAGE_GUILD`, returns an empty `204` on success, emits [Guild Integrations Update](https://docs.discord.com/developers/events/gateway-events#guild-integrations-update) and [Integration Delete](https://docs.discord.com/developers/events/gateway-events#integration-delete) Gateway events, and supports `X-Audit-Log-Reason`.


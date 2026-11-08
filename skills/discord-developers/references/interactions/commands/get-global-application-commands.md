# Get global application commands
Context: Discord developer reference: Get global application commands
[Source](command-endpoints-and-permissions-index.md) / [Previous source section](endpoints.md) / [Following source section](create-global-application-command.md)
<a id="source-get-global-application-commands"></a> <a id="source-query-string-params"></a>

### Get Global Application Commands

  When localization is enabled, this endpoint's response objects can include [additional fields if localization is active](https://docs.discord.com/developers/interactions/application-commands#retrieving-localized-commands). Use it to list every global command for the application; the response is an array of [application command](https://docs.discord.com/developers/interactions/application-commands#application-command-object) objects.

###### Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with_localizations? | boolean | Controls whether response objects include complete localization dictionaries (`name_localizations` and `description_localizations`) rather than `name_localized` and `description_localized`. Defaults to `false`. |


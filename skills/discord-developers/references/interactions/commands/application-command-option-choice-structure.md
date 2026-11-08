# Application command option choice structure
Context: Discord developer reference: Application command option choice structure
[Source](command-definitions-and-registration-index.md) / [Owning endpoint, event, object or procedure conditions](application-command-naming.md) / [Following source section](authorizing-your-application.md)
<a id="source-application-command-option-choice-structure"></a> <a id="source-entry-point-command-handler-types"></a>

###### Application Command Option Choice Structure

 When an option defines `choices`, users may select only those values.
| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character choice name |
| name_localizations? | ?dictionary keyed by available locales | Localization dictionary for `name`; values use the same restrictions as `name` |
| value | string, integer, or double * | Choice value; for strings, maximum 100 characters |

 * The [option type](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-option-type) that owns the choice determines the type of `value`.

###### Entry Point Command Handler Types

| Name | Value | Note |
| --- | --- | --- |
| APP_HANDLER | 1 | The app processes the interaction with an interaction token |
| DISCORD_LAUNCH_ACTIVITY | 2 | Discord launches an Activity for the interaction and sends the follow-up message itself, without coordinating with the app |

 See [Entry Point handlers](https://docs.discord.com/developers/interactions/application-commands#entry-point-handlers) for details about Entry Point command handler types.


# Application command naming
Context: Discord developer reference: Application command naming
[Source](command-definitions-and-registration-index.md) / [Previous source section](application-commands.md) / [Following source section](application-command-option-choice-structure.md)
<a id="source-application-command-object"></a> <a id="source-application-command-naming"></a> <a id="source-application-command-structure"></a> <a id="source-application-command-types"></a> <a id="source-application-command-option-structure"></a> <a id="source-application-command-option-type"></a>

### Application Command Object

###### Application Command Naming

 Names for `CHAT_INPUT` commands and command options must match `^[-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$` with the unicode flag enabled. If a letter has a lowercase form, the lowercase form is required. Characters without lowercase variants, and uncased letters, are allowed. `USER` and `MESSAGE` command names may use mixed case and spaces.

###### Application Command Structure

| Field | Type | Description | Valid Types |
| --- | --- | --- | --- |
| id | snowflake | Unique ID of command | all |
| type? | one of command types | Type of command, defaults to `1` | all |
| application_id | snowflake | ID of the parent application | all |
| guild_id? | snowflake | Command guild ID when the command is guild-scoped rather than global | all |
| name | string | Name of command, 1-32 characters | all |
| name_localizations? | ?dictionary keyed by available locales | Localization dictionary for `name`; values use the same restrictions as `name` | all |
| description | string | `CHAT_INPUT` command description, 1-100 characters. For `USER` and `MESSAGE`, this is an empty string | all |
| description_localizations? | ?dictionary keyed by available locales | Localization dictionary for `description`; values follow the same restrictions as `description` | all |
| options? * | array of command options | Command parameters, maximum 25 | CHAT_INPUT |
| default_member_permissions | ?string | Permission set encoded as a bit set | all |
| dm_permission? | boolean | **Deprecated (use `contexts` instead)**; for global commands only, states whether the command is available in DMs with the app. Commands are visible by default. | all |
| default_permission? | ?boolean | Deprecated soon and not recommended. Reports the command's default enabled state after the app joins a guild; the default value is `true` | all |
| nsfw? | boolean | Whether the command is age-restricted; defaults to `false` | all |
| integration_types? | list of integration types | Installation contexts where this globally-scoped command is available. Defaults to the app's configured contexts | all |
| contexts? | ?list of interaction context types | Interaction context or contexts where this globally-scoped command can run. | all |
| version | snowflake | Autoincrementing version identifier updated during substantial record changes | all |
| handler? | one of command handler types | Determines whether the app's interactions handler handles the interaction or Discord handles it | PRIMARY_ENTRY_POINT |

 * `options` is valid only on application commands of type `CHAT_INPUT`. * `handler` is valid only on `PRIMARY_ENTRY_POINT` application commands for applications with the `EMBEDDED` flag, meaning applications with an Activity. `default_permission` will soon be deprecated. To disable a command for everyone except admins by default, set `default_member_permissions` to `"0"`; to disable globally-scoped commands inside DMs with your app, use `contexts`.

###### Application Command Types

| Name | Type | Description |
| --- | --- | --- |
| CHAT_INPUT | 1 | Slash commands; text commands displayed when a user types `/` |
| USER | 2 | UI command shown when a user is right-clicked or tapped |
| MESSAGE | 3 | UI command shown when a message is right-clicked or tapped |
| PRIMARY_ENTRY_POINT | 4 | UI command representing the primary invocation path for an app's Activity |

###### Application Command Option Structure

 List required `options` before optional ones.
| Field | Type | Description | Valid Option Types |
| --- | --- | --- | --- |
| type | one of application command option type | Type of option | all |
| name * | string | 1-32 character name | all |
| name_localizations? | ?dictionary keyed by available locales | Localization dictionary for `name`; values use the same restrictions as `name` | all |
| description | string | 1-100 character description | all |
| description_localizations? | ?dictionary keyed by available locales | Localization dictionary for `description`; values use the same restrictions as `description` | all |
| required? | boolean | Whether the option is required; defaults to `false` | all but `SUB_COMMAND` and `SUB_COMMAND_GROUP` |
| choices? | array of application command option choice | Selectable user choices, maximum 25 | `STRING`, `INTEGER`, `NUMBER` |
| options? | array of application command option | For subcommand or subcommand group options, nested options hold the parameters or subcommands respectively; maximum 25 | `SUB_COMMAND` , `SUB_COMMAND_GROUP` |
| channel_types? | array of channel types | Restricts displayed channels to these channel types | `CHANNEL` |
| min_value? | integer for `INTEGER` options, double for `NUMBER` options | The minimum value permitted | `INTEGER` , `NUMBER` |
| max_value? | integer for `INTEGER` options, double for `NUMBER` options | The maximum value permitted | `INTEGER` , `NUMBER` |
| min_length? | integer | Minimum allowed string length; minimum `0`, maximum `6000` | `STRING` |
| max_length? | integer | Maximum allowed string length; minimum `1`, maximum `6000` | `STRING` |
| autocomplete? ** | boolean | Whether this option accepts autocomplete interactions | `STRING`, `INTEGER`, `NUMBER` |

 * `name` must be unique inside an array of [application command options](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-option-structure). ** `autocomplete` cannot be true when `choices` are present. Options with `autocomplete` are not limited to choices supplied by the application.

###### Application Command Option Type

| Name | Value | Note |
| --- | --- | --- |
| SUB_COMMAND | 1 |  |
| SUB_COMMAND_GROUP | 2 |  |
| STRING | 3 |  |
| INTEGER | 4 | Any integer between -2^53+1 and 2^53-1 |
| BOOLEAN | 5 |  |
| USER | 6 |  |
| CHANNEL | 7 | Includes all channel types + categories |
| ROLE | 8 |  |
| MENTIONABLE | 9 | Includes users and roles |
| NUMBER | 10 | Any double between -2^53 and 2^53 |
| ATTACHMENT | 11 | attachment object |


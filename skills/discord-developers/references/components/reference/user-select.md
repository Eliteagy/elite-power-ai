# User select
Context: Discord developer reference: User select
[Source](buttons-and-select-menus-index.md) / [Continued source contract](user-select-structure.md) / [Previous source section](text-input-examples.md)
<a id="source-user-select"></a> <a id="source-user-select-structure"></a>

### User Select

 A User Select is an interactive component that lets users choose one or more users in a message or modal. Discord automatically fills options from users available in the server. User Selects support both single-select and multi-select behavior. After the user finishes choosing, your app receives an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure). User Selects work in messages and modals. In messages they must be placed in an [Action Row](https://docs.discord.com/developers/components/reference#action-row); in modals they must be placed in a [Label](https://docs.discord.com/developers/components/reference#label).

###### User Select Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `5` for user select |
| id? | integer | Optional identifier for component |
| custom_id | string | Select menu ID; 1-100 characters |
| placeholder? | string | Placeholder shown when no value is selected; maximum 150 characters |
| default_values? | array of default value objects | Default values for auto-populated select menu components; the count must fit between `min_values` and `max_values` |
| min_values?* | integer | Fewest items required; defaults to 1, minimum 0 (see note), maximum 25 |
| max_values? | integer | Most items allowed; defaults to 1, maximum 25 |
| required?** | boolean | Whether a modal requires an answer for the user select; defaults to `true` |
| disabled?*** | boolean | Whether the select menu is disabled in a message; defaults to `false` |

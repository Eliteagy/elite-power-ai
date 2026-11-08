# Role select
Context: Discord developer reference: Role select
[Source](user-role-and-mentionable-selects-index.md) / [Previous source section](user-select-modal-response.md) / [Following source section](role-select-message-examples.md)
<a id="source-role-select"></a> <a id="source-role-select-structure"></a> <a id="source-role-select-interaction-response-structure"></a>

### Role Select

 A Role Select is an interactive component that lets users choose one or more roles in a message or modal. Discord fills the options automatically from roles available in the server. Role Selects support both single-select and multi-select configuration. After the user completes the selection, your app receives an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure). Role Selects work in messages and modals. In messages they must be inside an [Action Row](https://docs.discord.com/developers/components/reference#action-row); in modals they must be inside a [Label](https://docs.discord.com/developers/components/reference#label).

###### Role Select Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `6` for role select |
| id? | integer | Optional identifier for component |
| custom_id | string | Select menu ID; 1-100 characters |
| placeholder? | string | Placeholder shown when no value is selected; maximum 150 characters |
| default_values? | array of default value objects | Default values for auto-populated select menu components; the count must fit between `min_values` and `max_values` |
| min_values?* | integer | Fewest items required; defaults to 1, minimum 0 (see note), maximum 25 |
| max_values? | integer | Most items allowed; defaults to 1, maximum 25 |
| required?** | boolean | Whether a modal requires an answer for the role select; defaults to `true` |
| disabled?*** | boolean | Whether the select menu is disabled in a message; defaults to `false` |

 * `min_values` must be omitted or set to at least `1` when `required` is omitted or `true`. ** The `required` field applies only to Role Selects in modals and is ignored in messages. *** Setting `disabled` inside a modal causes an error because disabled components are not currently supported in modals.

###### Role Select Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type* | integer | `6` for a Role Select |
| component_type* | integer | `6` for a Role Select |
| id | integer | Unique identifier for the component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| resolved | resolved data | Resolved entities from selected options |
| values | array of snowflakes | IDs of the selected roles |

 * Message interaction responses include `component_type`; modal interaction responses include `type`.


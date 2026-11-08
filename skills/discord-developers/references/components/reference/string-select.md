# String select
Context: Discord developer reference: String select
[Source](buttons-and-select-menus-index.md) / [Previous source section](general-button-content.md) / [Following source section](string-select-message-examples.md)
<a id="source-string-select"></a> <a id="source-string-select-structure"></a> <a id="source-select-option-structure"></a> <a id="source-string-select-interaction-response-structure"></a>

### String Select

 A String Select is an interactive component that lets users choose one or more supplied `options`. It can be configured for single-select or multi-select behavior. When selection is complete, your app receives an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure). String Selects work in messages and modals. In messages they must be placed inside an [Action Row](https://docs.discord.com/developers/components/reference#action-row); in modals they must be placed inside a [Label](https://docs.discord.com/developers/components/reference#label).

###### String Select Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `3` for string select |
| id? | integer | Optional identifier for component |
| custom_id | string | Select menu ID; 1-100 characters |
| options | array of select options | Choices defined for the select menu; maximum 25 |
| placeholder? | string | Placeholder shown when no default or selection is present; maximum 150 characters |
| min_values?* | integer | Fewest items required; defaults to 1, minimum 0 (see note), maximum 25 |
| max_values? | integer | Most items allowed; defaults to 1, maximum 25 |
| required?** | boolean | Whether a modal requires an answer for the string select; defaults to `true` |
| disabled?*** | boolean | Whether the select menu is disabled in a message; defaults to `false` |

 * `min_values` must be omitted or set to at least `1` when `required` is omitted or `true`. ** The `required` field applies only to String Selects in modals and is ignored in messages. *** Setting `disabled` inside a modal causes an error because disabled components are not currently supported in modals.

###### Select Option Structure

| Field | Type | Description |
| --- | --- | --- |
| label | string | Option name shown to users; maximum 100 characters |
| value | string | Option value defined by the developer; maximum 100 characters |
| description? | string | Extra option description; maximum 100 characters |
| emoji? | partial emoji object | `id`, `name`, and `animated` |
| default? | boolean | Displays this option as selected by default |

###### String Select Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type* | integer | `3` for a String Select |
| component_type* | integer | `3` for a String Select |
| id | integer | Unique identifier for the component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| values | array of strings | Text values for the selected options |

 * Message interaction responses include `component_type`; modal interaction responses include `type`.


# Mentionable select
Context: Discord developer reference: Mentionable select
[Source](user-role-and-mentionable-selects-index.md) / [Previous source section](role-select-modal-response.md) / [Following source section](mentionable-select-message-response.md)
<a id="source-mentionable-select"></a> <a id="source-mentionable-select-structure"></a> <a id="source-mentionable-select-interaction-response-structure"></a> <a id="source-examples-2"></a>

### Mentionable Select

 A Mentionable Select is an interactive component that lets users pick one or more mentionables in a message or modal. Discord automatically fills the options from mentionables available in the server. Mentionable Selects can be set up for single-select or multi-select behavior. When the user finishes choosing, your app receives an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure). Mentionable Selects are supported in messages and modals. In messages they must be placed in an [Action Row](https://docs.discord.com/developers/components/reference#action-row); in modals they must be placed in a [Label](https://docs.discord.com/developers/components/reference#label).

###### Mentionable Select Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `7` for mentionable select |
| id? | integer | Optional identifier for component |
| custom_id | string | Select menu ID; 1-100 characters |
| placeholder? | string | Placeholder shown when no value is selected; maximum 150 characters |
| default_values? | array of default value objects | Default values for auto-populated select menu components; the count must fit between `min_values` and `max_values` |
| min_values?* | integer | Fewest items required; defaults to 1, minimum 0 (see note), maximum 25 |
| max_values? | integer | Most items allowed; defaults to 1, maximum 25 |
| required?** | boolean | Whether a modal requires an answer for the mentionable select; defaults to `true` |
| disabled?*** | boolean | Whether the select menu is disabled in a message; defaults to `false` |

 * `min_values` must be omitted or set to at least `1` when `required` is omitted or `true`. ** The `required` field applies only to Mentionable Selects in modals and is ignored in messages. *** Setting `disabled` inside a modal causes an error because disabled components are not currently supported in modals.

###### Mentionable Select Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type* | integer | `7` for a Mentionable Select |
| component_type* | integer | `7` for a Mentionable Select |
| id | integer | Unique identifier for the component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| resolved | resolved data | Resolved entities from selected options |
| values | array of snowflakes | IDs of the selected mentionables |

 * Message interaction responses include `component_type`; modal interaction responses include `type`.

###### Examples

Message Example

Payload for creating a message with a Mentionable Select component

(Figure: Mentionable Select example produced by the code below)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1,  // ComponentType.ACTION_ROW
      "components": [
        {
          "type": 7, // ComponentType.MENTIONABLE_SELECT
          "custom_id": "who_to_ping",
          "placeholder": "Who?",
        }
      ]
    }
  ]
}

```

Message Interaction Data Example

A user chooses an option in a message Mentionable Select

When a user uses a Mentionable Select in a message, the interaction data payload has this basic shape. The full payload is covered in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference. If a user is selected, `resolved` may include both `members` and `users`.


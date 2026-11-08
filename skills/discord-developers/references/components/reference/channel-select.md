# Channel select
Context: Discord developer reference: Channel select
[Source](user-role-and-mentionable-selects-index.md) / [Continued source contract](channel-select-message-response-modal-request.md) / [Previous source section](mentionable-select-modal-examples.md)
<a id="source-channel-select"></a> <a id="source-channel-select-structure"></a> <a id="source-channel-select-interaction-response-structure"></a> <a id="source-examples-3"></a>

### Channel Select

 A Channel Select is an interactive component that lets users choose one or more channels in a message or modal. Discord automatically fills options from channels available in the server, and the list can be filtered by channel type. Channel Selects support single-select and multi-select configurations. After the user makes their choice, your app receives an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure). Channel Selects work in messages and modals. In messages they must be placed in an [Action Row](https://docs.discord.com/developers/components/reference#action-row); in modals they must be placed in a [Label](https://docs.discord.com/developers/components/reference#label).

###### Channel Select Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `8` for channel select |
| id? | integer | Optional identifier for component |
| custom_id | string | Select menu ID; 1-100 characters |
| channel_types? | array of channel types | Channel types that the channel select component should include |
| placeholder? | string | Placeholder shown when no value is selected; maximum 150 characters |
| default_values? | array of default value objects | Default values for auto-populated select menu components; the count must fit between `min_values` and `max_values` |
| min_values?* | integer | Fewest items required; defaults to 1, minimum 0 (see note), maximum 25 |
| max_values? | integer | Most items allowed; defaults to 1, maximum 25 |
| required?** | boolean | Whether a modal requires an answer for the channel select; defaults to `true` |
| disabled?*** | boolean | Whether the select menu is disabled in a message; defaults to `false` |

 * `min_values` must be omitted or set to at least `1` when `required` is omitted or `true`. ** The `required` field applies only to Channel Selects in modals and is ignored in messages. *** Setting `disabled` inside a modal causes an error because disabled components are not currently supported in modals.

###### Channel Select Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type* | integer | `8` for a Channel Select |
| component_type* | integer | `8` for a Channel Select |
| id | integer | Unique identifier for the component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| resolved | resolved data | Resolved entities from selected options |
| values | array of snowflakes | IDs of the selected channels |

 * Message interaction responses include `component_type`; modal interaction responses include `type`.

###### Examples

Message Example

Payload for creating a message with a Channel Select component

(Figure: Channel Select example limited to text channels)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1,  // ComponentType.ACTION_ROW
      "components": [
        {
          "type": 8,  // ComponentType.CHANNEL_SELECT
          "custom_id": "notification_channel",
          "channel_types": [0],  // ChannelType.TEXT
          "placeholder": "Which text channel?"
        }
      ]
    }
  ]
}

```

Message Interaction Data Example

A user chooses an option in a message Channel Select

When a user uses a Channel Select in a message, the interaction data payload follows this basic form. See the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference for the complete payload.

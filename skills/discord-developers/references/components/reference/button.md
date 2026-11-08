# Button
Context: Discord developer reference: Button
[Source](buttons-and-select-menus-index.md) / [Previous source section](action-row.md) / [Following source section](general-button-content.md)
<a id="source-button"></a> <a id="source-button-structure"></a> <a id="source-button-styles"></a> <a id="source-examples-1"></a>

### Button

 A Button is an interactive component available only in messages. It creates a clickable element for users, and clicking it sends an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object) to your app. Buttons must be inside an [Action Row](https://docs.discord.com/developers/components/reference#action-row) or in a [Section](https://docs.discord.com/developers/components/reference#section)'s `accessory` field.

###### Button Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `2` for a button |
| id? | integer | Optional identifier for component |
| style | integer | A button style |
| label? | string | Text displayed on the button; maximum 80 characters |
| emoji? | partial emoji | `name`, `id`, and `animated` |
| custom_id? | string | Button identifier chosen by the developer; 1-100 characters |
| sku_id? | snowflake | Purchasable SKU identifier, available only for premium-style buttons |
| url? | string | URL used by link-style buttons; maximum 512 characters |
| disabled? | boolean | Whether the button is disabled; defaults to `false` |

 Button styles communicate different action types, and each style also determines which button fields are valid.
- Buttons that are neither link-style nor premium-style **must** include `custom_id`, and must not include `url` or `sku_id`.
- Link buttons **must** include `url`, and must not include `custom_id`
- Link buttons do not send your app an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object) when clicked
- Premium buttons **must** include `sku_id`, and must not include `custom_id`, `label`, `url`, or `emoji`.
- Premium buttons do not send your app an [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object) when clicked

###### Button Styles

| Name | Value | Action | Required Field |
| --- | --- | --- | --- |
| Primary | 1 | Primary or recommended action among a set of choices | `custom_id` |
| Secondary | 2 | Alternative or supporting actions | `custom_id` |
| Success | 3 | Positive confirmation or completion actions | `custom_id` |
| Danger | 4 | An action with irreversible consequences | `custom_id` |
| Link | 5 | Navigates to a URL | `url` |
| Premium | 6 | Purchase | `sku_id` |

###### Examples

Message Example

Payload for creating a message with a Button component

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1,  // ComponentType.ACTION_ROW
      "components": [
          {
            "type": 2,  // ComponentType.BUTTON,
            "custom_id": "click_me",
            "label": "Click me!",
            "style": 1
          }
      ]
    }
  ]
}

```

Message Interaction Response Example

A user clicks a Button in a message

When a user clicks a Button in a message, the interaction data payload follows this basic form. The complete payload is documented in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

```
{
  "type": 3, // InteractionType.MESSAGE_COMPONENT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "component_type": 2, // ComponentType.BUTTON
    "id": 2,
    "custom_id": "click_me",
  },
}

```


# String select message examples
Context: Discord developer reference: String select message examples
[Source](buttons-and-select-menus-index.md) / [Owning endpoint, event, object or procedure conditions](string-select.md) / [Following source section](string-select-modal-examples.md)
<a id="source-examples-2"></a>

###### Examples

Message Example

Payload for creating a message with a String Select component

(Figure: String Select example with three options)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1, // ComponentType.ACTION_ROW,
      "id": 1,
      "components": [
        {
          "type": 3, // ComponentType.STRING_SELECT
          "id": 2,
          "custom_id": "favorite_bug",
          "placeholder": "Favorite bug?",
          "options": [
            {
              "label": "Ant",
              "value": "ant",
              "description": "(best option)",
              "emoji": {"name": "🐜"}
            },
            {
              "label": "Butterfly",
              "value": "butterfly",
              "emoji": {"name": "🦋"}
            },
            {
              "label": "Caterpillar",
              "value": "caterpillar",
              "emoji": {"name": "🐛"}
            }
          ]
        }
      ]
    }
  ]
}

```

Message Interaction Data Example

A user chooses an option from a message StringSelect

When a user uses a StringSelect in a message, the interaction data payload follows this basic structure. The complete payload is available in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

```
{
  "type": 3, // InteractionType.MESSAGE_COMPONENT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "component_type": 3, // ComponentType.STRING_SELECT
    "custom_id": "favorite_bug",
    "values": [
      "butterfly",
    ]
  },
}

```

Modal Example

Payload for creating a modal with a String Select component

(Figure: Modal example with a String Select containing three options)


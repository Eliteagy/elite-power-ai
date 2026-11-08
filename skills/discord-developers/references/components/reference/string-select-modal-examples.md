# String select modal examples
Context: Discord developer reference: String select modal examples
[Source](buttons-and-select-menus-index.md) / [Owning endpoint, event, object or procedure conditions](string-select.md) / [Owning endpoint, event, object or procedure conditions](string-select-message-examples.md) / [Following source section](text-input.md)

```
{
  "type": 9, // InteractionCallbackType.MODAL
  "data": {
    "custom_id": "bug_modal",
    "title": "Bug Survey",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "id": 1,
        "label": "Favorite bug?",
        "component": {
          "type": 3, // ComponentType.STRING_SELECT
          "id": 2,
          "custom_id": "favorite_bug",
          "placeholder": "Ants are the best",
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
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

A user submits a modal that includes a String Select

When a submitted modal includes a String Select, the interaction data payload follows this basic form. See the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference for the complete payload.

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "bug_modal",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "id": 1,
        "component": {
          "type": 3, // ComponentType.STRING_SELECT
          "id": 2,
          "custom_id": "favorite_bug",
          "values": [
            "butterfly",
          ]
        }
      }
    ]
  },
}

```

---


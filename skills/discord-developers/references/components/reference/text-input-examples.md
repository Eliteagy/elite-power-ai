# Text input examples
Context: Discord developer reference: Text input examples
[Source](buttons-and-select-menus-index.md) / [Owning endpoint, event, object or procedure conditions](text-input.md) / [Following source section](user-select.md)
<a id="source-examples-3"></a>

###### Examples

Modal Example

Payload for creating a modal with a Text Input component

(Figure: Modal containing Text Input inside a Label)

```
{
  "type": 9, // InteractionCallbackType.MODAL
  "data": {
    "custom_id": "game_feedback_modal",
    "title": "Game Feedback",
    "components": [
      {
        "type": 18,  // ComponentType.LABEL
        "label": "What did you find interesting about the game?",
        "description": "Please give us as much detail as possible so we can improve the game!",
        "component": {
          "type": 4,  // ComponentType.TEXT_INPUT
          "custom_id": "game_feedback",
          "style": 2,
          "min_length": 100,
          "max_length": 4000,
          "placeholder": "Write your feedback here...",
          "required": true
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

A user submits a modal that includes a TextInput

When a submitted modal includes a TextInput, the interaction data payload follows this basic form. The complete payload is documented in the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference.

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "game_feedback_modal",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "id": 1,
        "component": {
          "type": 4, // ComponentType.TEXT_INPUT
          "id": 2,
          "custom_id": "game_feedback",
          "value": "The recent changes to acceleration feel much better, but shadows still need help"
        }
      }
    ]
  },
}

```

---


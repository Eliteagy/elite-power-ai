# Radio group modal examples
Context: Discord developer reference: Radio group modal examples
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](radio-group-interaction-response-structure.md) / [Following source section](checkbox-group.md)
<a id="source-examples"></a>

### Examples

Modal Example

Payload for creating a modal that contains a Radio Group component

(Figure: Example of a modal with a Radio Group)

```
{
  "type": 9,
  "data": {
    "custom_id": "class_selection_modal",
    "title": "Class Selection",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "label": "Choose your class",
        "description": "Your class detertmines the style of play for your character.",
        "component": {
          "type": 21, // ComponentType.RADIO_GROUP
          "custom_id": "class_radio",
          "options": [
            {"value": "warrior", "label": "Warrior", "description": "Strong and brave"},
            {"value": "rogue", "label": "Rogue", "description": "Weak and squishy"},
            {"value": "wizard", "label": "Wizard", "description": "Nerd"},
            {"value": "bard", "label": "Bard", "description": "Annoys everyone"},
            {"value": "witch_doctor", "label": "Witch Doctor", "description": "Actually a pretty cool option"}
          ]
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

User submission data for a modal that includes a Radio Group

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "class_selection_modal",
    "components": [
      {
        "id": 1,
        "type": 18, // ComponentType.LABEL
        "component": {
          "custom_id": "class_radio",
          "id": 2,
          "type": 21, // ComponentType.RADIO_GROUP
          "value": "warrior"
        }
      }
    ]
  }
}

```

---


# Checkbox modal examples
Context: Discord developer reference: Checkbox modal examples
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox-interaction-response-structure.md) / [Following source section](unfurled-media-item.md)
<a id="source-examples-2"></a>

### Examples

Modal Example

Payload for creating a modal that contains a Checkbox component

(Figure: Example of a modal with a Checkbox)

```
{
  "type": 9,
  "data": {
    "custom_id": "secret_note_modal",
    "title": "Secret Note",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "label": "Do you like me?",
        "description": "😳😳😳",
        "component": {
          "type": 23, // ComponentType.CHECKBOX
          "custom_id": "like_checkbox"
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

User submission data for a modal that includes a Checkbox

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "secret_note_modal",
    "components": [
      {
        "id": 1,
        "type": 18, // ComponentType.LABEL
        "component": {
          "custom_id": "like_checkbox",
          "id": 2,
          "type": 23, // ComponentType.CHECKBOX
          "value": true
        }
      }
    ]
  }
}

```

---


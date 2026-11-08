# Checkbox group modal examples
Context: Discord developer reference: Checkbox group modal examples
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox-group-interaction-response-structure.md) / [Following source section](checkbox.md)
<a id="source-examples-1"></a>

### Examples

Modal Example

Payload for creating a modal that contains a Checkbox Group component

(Figure: Example of a modal with a Checkbox Group)

```
{
  "type": 9,
  "data": {
    "custom_id": "day_selection_modal",
    "title": "Study Days",
    "components": [
      {
        "type": 18, // ComponentType.LABEL
        "label": "Which days are you free?",
        "description": "Choose all of the days you're able to meet up.",
        "component": {
          "type": 22, // ComponentType.CHECKBOX_GROUP
          "custom_id": "event_checkbox",
          "options": [
            {"value": "march-4", "label": "March 4th"},
            {"value": "march-5", "label": "March 5th"},
            {"value": "march-7", "label": "March 7th", "description": "I know this is a Saturday and is tough"},
            {"value": "march-9", "label": "March 9th"},
            {"value": "march-10", "label": "March 10th"}
          ]
        }
      }
    ]
  }
}

```

Modal Submit Interaction Data Example

User submission data for a modal that includes a Checkbox Group

```
{
  "type": 5, // InteractionType.MODAL_SUBMIT
  ...additionalInteractionFields, // See the Interaction documentation for all fields

  "data": {
    "custom_id": "day_selection_modal",
    "components": [
      {
        "id": 1,
        "type": 18, // ComponentType.LABEL
        "component": {
          "custom_id": "event_checkbox",
          "id": 2,
          "type": 22, // ComponentType.CHECKBOX_GROUP
          "values": [
            "march-5",
            "march-10",
            "march-4"
          ]
        }
      }
    ]
  }
}

```

---


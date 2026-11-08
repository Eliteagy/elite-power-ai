# Label examples
Context: Discord developer reference: Label examples
[Source](channel-selects-and-layout-components-index.md) / [Owning endpoint, event, object or procedure conditions](label.md) / [Following source section](file-upload.md)
<a id="source-examples-7"></a>

###### Examples

Modal Example

Modal create payload with a Label component (wrapping a Text Input)

(Figure: A modal with Text Input in a Label)

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

---


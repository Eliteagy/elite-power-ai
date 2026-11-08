# Text display examples
Context: Discord developer reference: Text display examples
[Source](channel-selects-and-layout-components-index.md) / [Owning endpoint, event, object or procedure conditions](text-display.md) / [Following source section](thumbnail.md)
<a id="source-examples-1"></a>

###### Examples

Message Example

Message create payload with a Text Display component

(Figure: Example of a Text Display with markdown)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,  // ComponentType.TEXT_DISPLAY
      "content": "# This is a Text Display\nAll the regular markdown rules apply\n- You can make lists\n- You can use `code blocks`\n- You can use [links](http://watchanimeattheoffice.com/)\n- Even :blush: :star_struck: :exploding_head:\n- Spoiler alert: ||these too!||"
    }
  ]
}

```

Modal Example

Modal create payload with a Text Display component

(Figure: Example of a Text Display from that code below)

```
{
  "type": 9,
  "data": {
    "custom_id": "jail_modal",
    "title": "Jail",
    "components": [
      {
        "type": 10,
        "content": "This action will move the selected user to the selected voice channel and take away all their permissions **for 1 hour**."
      },
      {
        "type": 18,
        "label": "Choose a user",
        "component": {
          "type": 5,
          "custom_id": "user_selected",
          "required": true
        }
      },
      {
        "type": 18,
        "label": "Where should they be sent?",
        "component": {
          "type": 8,
          "custom_id": "channel_selected",
          "channel_types": [
            2
          ],
          "required": true
        }
      }
    ]
  }
}

```

---


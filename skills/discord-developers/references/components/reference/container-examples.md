# Container examples
Context: Discord developer reference: Container examples
[Source](channel-selects-and-layout-components-index.md) / [Owning endpoint, event, object or procedure conditions](container.md) / [Following source section](label.md)
<a id="source-examples-6"></a>

###### Examples

Message Example

Message create payload with a Container component

(Figure: Example of one container showing text, image, and buttons for a wild enemy encounter)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 17,  // ComponentType.CONTAINER
      "accent_color": 703487,
      "components": [
        {
          "type": 10,  // ComponentType.TEXT_DISPLAY
          "content": "# You have encountered a wild coyote!"
        },
        {
          "type": 12,  // ComponentType.MEDIA_GALLERY
          "items": [
            {
              "media": {"url": "https://websitewithopensourceimages/coyote.webp"},
            }
          ]
        },
        {
          "type": 10,  // ComponentType.TEXT_DISPLAY
          "content": "What would you like to do?"
        },
        {
          "type": 1,  // ComponentType.ACTION_ROW
          "components": [
            {
              "type": 2,  // ComponentType.BUTTON
              "custom_id": "pet_coyote",
              "label": "Pet it!",
              "style": 1
            },
            {
              "type": 2,  // ComponentType.BUTTON
              "custom_id": "feed_coyote",
              "label": "Attempt to feed it",
              "style": 2
            },
            {
              "type": 2,  // ComponentType.BUTTON
              "custom_id": "run_away",
              "label": "Run away!",
              "style": 4
            }
          ]
        }
      ]
    }
  ]
}

```

---


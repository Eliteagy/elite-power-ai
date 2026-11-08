# Separator
Context: Discord developer reference: Separator
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](file.md) / [Following source section](container.md)
<a id="source-separator"></a> <a id="source-separator-structure"></a> <a id="source-examples-5"></a>

### Separator

 A Separator provides one top-level layout component that adds vertical padding plus visual division between other components. Separators are currently works only in messages. Messages can use this component only once they include the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) and that flag is enabled per message.

###### Separator Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `14` for separator component |
| id? | integer | Optional identifier for component |
| divider? | boolean | Whether a visual divider must be displayed within the component. Default value is `true` |
| spacing? | integer | Size for separator padding—`1` for small padding, `2` for this large padding. Defaults to `1` |

###### Examples

Message Example

Message create payload with a Separator component

(Figure: Example of a separator with large spacing dividing content)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,  // ComponentType.TEXT_DISPLAY
      "content": "It's dangerous to go alone!"
    },
    {
      "type": 14,  // ComponentType.SEPARATOR
      "divider": true,
      "spacing": 1
    },
    {
      "type": 10,  // ComponentType.TEXT_DISPLAY
      "content": "Take this."
    }
  ]
}

```

---


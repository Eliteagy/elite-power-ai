# Nesting components with layout components
Context: Discord developer reference: Nesting components with layout components
[Source](components-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](sending-a-message-with-multiple-components.md) / [Following source section](using-message-components-with-interactions.md)
<a id="source-nesting-components-with-layout-components"></a>

### Nesting Components with Layout Components

 Layout components can contain other components, giving you control over how information, images, and interactive controls are arranged for users. The [list of components](https://docs.discord.com/developers/components/reference#component-object-component-types) documents every available layout component. For instance, an Action Row component can wrap several Button components.

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,
      "content": "This is a message with v2 components"
    },
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "style": 1,
          "label": "Click Me",
          "custom_id": "click_me_1"
        },
        {
          "type": 2,
          "style": 2,
          "label": "Click Me Too",
          "custom_id": "click_me_2"
        }
      ]
    }
  ]
}

```


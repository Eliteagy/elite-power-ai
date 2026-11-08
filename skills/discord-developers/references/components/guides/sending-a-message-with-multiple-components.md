# Sending a message with multiple components
Context: Discord developer reference: Sending a message with multiple components
[Source](components-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](sending-a-message-with-a-component.md) / [Following source section](nesting-components-with-layout-components.md)
<a id="source-sending-a-message-with-multiple-components"></a>

### Sending a Message with Multiple Components

 To include more than one component in a message, put multiple component objects in the message `components` array.

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,
      "content": "This is a Text Display component."
    },
    {
      "type": 10,
      "content": "This is another Text Display component!"
    }
  ]
}

```


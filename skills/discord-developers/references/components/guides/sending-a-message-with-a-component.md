# Sending a message with a component
Context: Discord developer reference: Sending a message with a component
[Source](components-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-prerequisites.md) / [Following source section](sending-a-message-with-multiple-components.md)
<a id="source-sending-a-message-with-a-component"></a>

### Sending a Message with a Component

 A message that uses components must set the `IS_COMPONENTS_V2` flag (`1<<15`) on the message `flags` field. You can set it through [Message Create](https://docs.discord.com/developers/resources/message#create-message), [Execute Webhook](https://docs.discord.com/developers/resources/webhook#execute-webhook), or when [responding to an interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#create-followup-message). After a message is created with `IS_COMPONENTS_V2`, editing the message cannot remove that flag. The flag marks the message as component-based, turns off the traditional content and embeds format, and requires all visible content to be represented through components.

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,
      "content": "This is a message using the Text Display component"
    }
  ]
}

```


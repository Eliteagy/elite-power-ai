# Legacy message component behavior
Context: Discord developer reference: Legacy message component behavior
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](uploading-a-file.md)
<a id="source-legacy-message-component-behavior"></a>

### Legacy Message Component Behavior

 Before `IS_COMPONENTS_V2` was introduced ([see changelog](https://docs.discord.com/developers/change-log#introducing-new-components-for-messages)), message components were sent together with message content. Apps could send messages with some available components without setting `IS_COMPONENTS_V2`; those components appeared alongside `content` and `embeds`. Components on pre-components V2 messages also have an `id` of `0`. Apps using this Legacy Message Component behavior still function, but new apps or features should prefer `IS_COMPONENTS_V2` for richer layout and customization. In legacy messages, the top-level component list can contain as many as 5 action rows. Legacy Message Component Example

```
{
  "content": "This is a message with legacy components",
  "components": [
    {
      "type": 1,
      "components": [
        {
          "type": 2,
          "style": 1,
          "label": "Click Me",
          "custom_id": "click_me_1"
        }
      ]
    }
  ]
}

```

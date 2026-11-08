# Text display
Context: Discord developer reference: Text display
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](section.md) / [Following source section](text-display-examples.md)
<a id="source-text-display"></a> <a id="source-text-display-structure"></a> <a id="source-text-display-interaction-response-structure"></a>

### Text Display

 A Text Display is a content component that permits you to add markdown formatted text, covering mentions (users, roles, etc) and emojis. This behavior of this component is extremely similar to that [`content` field of a message](https://docs.discord.com/developers/resources/message#message-object), but permits you to add multiple text components, controlling the layout of your message. Once delivered in a message, pingable mentions (@user, @role, etc) present in this component can ping and send notifications based on the value for this [allowed mention object](https://docs.discord.com/developers/resources/message#allowed-mentions-object) set inside [`message.allowed_mentions`](https://docs.discord.com/developers/resources/message#message-object). Messages can use this component only once they include the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) and that flag is enabled per message.

###### Text Display Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `10` for text display |
| id? | integer | Optional identifier for component |
| content | string | Text that may be displayed similar to a message |

###### Text Display Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `10` for a Text Display |
| id | integer | Unique identifier for the component |


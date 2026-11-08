# Reference
Context: Discord developer reference: Reference
[Source](buttons-and-select-menus-index.md) / [Following source section](what-is-a-component.md)
<a id="source-components--reference-part-1"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

This reference covers every available component and divides them into three broad groups:
- **Layout Components** - Used to arrange and structure content (Action Rows, Sections, Containers)
- **Content Components** - Used to show static text, images, and files (Text Display, Media Gallery, Thumbnails)
- **Interactive Components** - Used for user input and interaction (Buttons, Select Menus, Text Input)
 To use these components, send the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) on the message. The flag is applied per message. After a message is sent with this flag, it cannot be removed from that message. Enabling the new component system changes message behavior as follows:
- The `content` and `embeds` fields stop working; use [Text Display](https://docs.discord.com/developers/components/reference#text-display) and [Container](https://docs.discord.com/developers/components/reference#container) instead
- Attachments are hidden unless components expose them
- The `poll` and `stickers` fields are unavailable
- A message can contain up to 40 components total
 [Legacy component behavior](https://docs.discord.com/developers/components/reference#legacy-message-component-behavior) still works, but gives less control and layout flexibility. For implementation guidance, see [Using Message Components](https://docs.discord.com/developers/components/using-message-components) and [Using Modal Components](https://docs.discord.com/developers/components/using-modal-components).

---


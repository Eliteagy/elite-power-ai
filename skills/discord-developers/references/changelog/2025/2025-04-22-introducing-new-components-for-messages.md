# Introducing New Components for Messages!

Date: 2025-04-22
Categories: User Apps, HTTP API, Interactions
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2140) · [Year index](INDEX.md)

<a id="source-introducing-new-components-for-messages"></a>


New message components are available for apps, giving developers full control over message layout.

<a id="source-why-we-built-components-v2"></a>

#### Why We Built Components V2

The earlier components system worked, but it had constraints:
- Content, attachments, embeds, and components were forced into fixed vertical positions.
- Visual styling options were limited
- Building cohesive visual experiences was difficult because message capabilities were expressed through separate, non-unified systems.
The new component system addresses those issues with composable components that can be ordered and arranged freely, enabling more flexible and visually coherent layouts.

<a id="source-whats-new-1"></a>

#### What’s New

[Components V2](https://docs.discord.com/developers/components/overview) adds several component types for messages:

<a id="source-new-layout-components"></a>

#### New Layout Components

- [**Section**](https://docs.discord.com/developers/components/reference#section) - Pair text with an accessory component for related elements.
- [**Container**](https://docs.discord.com/developers/components/reference#container) - Group content visually with a configurable accent color.
- [**Separator**](https://docs.discord.com/developers/components/reference#separator) - Insert spacing and dividers between components.

<a id="source-new-content-components"></a>

#### New Content Components

- [**Text Display**](https://docs.discord.com/developers/components/reference#text-display) - Place rich markdown-formatted text anywhere in messages.
- [**Thumbnail**](https://docs.discord.com/developers/components/reference#thumbnail) - Use an image inside a [section](https://docs.discord.com/developers/components/reference#section).
- [**Media Gallery**](https://docs.discord.com/developers/components/reference#media-gallery) - Show image and video collections in an organized grid.
- [**File**](https://docs.discord.com/developers/components/reference#file) - Include file attachments within the message layout.

<a id="source-getting-started"></a>

#### Getting Started

To enable the new components for a message, send the `1 << 15` (`IS_COMPONENTS_V2`) message flag. Guides are available for implementing these features:
- [Using Message Components](https://docs.discord.com/developers/components/using-message-components) - Learn to create rich message layouts with components.
- [Using Modal Components](https://docs.discord.com/developers/components/using-modal-components) - Build interactive forms and dialogs.

<a id="source-compatibility-notes"></a>

#### Compatibility Notes

[Legacy component behavior](https://docs.discord.com/developers/components/reference#legacy-message-component-behavior) remains supported, so existing integrations keep working. When the Components V2 flag is used, these changes apply:
- `content` and `embeds` no longer work; use [Text Display](https://docs.discord.com/developers/components/reference#text-display) and [Container](https://docs.discord.com/developers/components/reference#container) instead.
- Attachments must be surfaced through components to appear. Use a [Media Gallery](https://docs.discord.com/developers/components/reference#media-gallery), [Thumbnail](https://docs.discord.com/developers/components/reference#thumbnail), or [File](https://docs.discord.com/developers/components/reference#file) component.
- The `poll` and `stickers` fields are disabled.
- Messages can have a max of 10 top-level components and 30 total components.

<a id="source-developer-resources-1"></a>

#### Developer Resources

See the [Component Reference](https://docs.discord.com/developers/components/reference) for detailed specifications covering all available components.

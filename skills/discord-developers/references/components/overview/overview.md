# Overview
Context: Discord developer reference: Overview
[Source](message-and-modal-components-index.md) / [Following source section](using-message-components.md)
<a id="source-components--overview"></a>

# Components - Overview

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Components let an app place interactive UI in modals and in messages it sends. They are designed to be accessible, configurable, and straightforward to apply. For a primer on modal behavior and component types, see the [Components & Modals](https://docs.discord.com/developers/platform/components) platform page. (Figure: Image showing examples of components UI) Messages that use components must include the `IS_COMPONENTS_V2` flag (`1<<15`). When that flag is present, classic message content and embeds are unavailable; the message body must be represented entirely through components. [Legacy message component behavior](https://docs.discord.com/developers/components/reference#legacy-message-component-behavior) will **not** be deprecated and remains usable by apps per message. For new builds and features, use the new components model.


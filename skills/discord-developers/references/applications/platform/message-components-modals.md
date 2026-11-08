# Message components modals
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](message-components.md) / [Previous source section](message-components.md) / [Following source section](message-components-components-overview.md)

<a id="source-modals"></a>

### Modals

 Modals are form-style overlays an app can show after an interaction, such as a button click, slash command, or select menu choice. They gather freeform text input and work well for multi-field entry, confirmations, bug reports, and configuration paths that need more than one tap. Modals are not attached to messages like message components. They are sent as interaction responses, appear as focused client overlays, and produce a new interaction when the user submits the form.

<a id="source-message-components--modals"></a>

### Message Components & Modals

 [Message components](https://docs.discord.com/developers/platform/components) also create interactions when users use them. A button click or select menu submission on an app message is delivered like a command interaction. [Modals](https://docs.discord.com/developers/platform/components#modals) follow the same model: the app responds to an interaction by opening a modal, and the submitted modal becomes another interaction for the app to handle.

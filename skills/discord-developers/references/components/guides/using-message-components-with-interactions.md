# Using message components with interactions
Context: Discord developer reference: Using message components with interactions
[Source](components-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](nesting-components-with-layout-components.md) / [Following source section](overview.md)
<a id="source-using-message-components-with-interactions"></a>

### Using Message Components with Interactions

 When someone uses an interactive message component, your app [receives an interaction event](https://docs.discord.com/developers/interactions/overview). The event includes details such as the interaction type and the component that was used. The [list of supported component types](https://docs.discord.com/developers/components/reference#component-object-component-types) maps interactive message components to their interaction event payloads. Use that data to reply, edit the message, or take another action, such as opening a modal based on the user's input. The [Interactions documentation](https://docs.discord.com/developers/interactions/overview) explains how to process interactions and respond to input from interactive components.


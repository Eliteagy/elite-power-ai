# Commands
Context: Discord developer reference: Commands
[Source](interaction-types-index.md) / [Previous source section](types-of-interactions.md) / [Following source section](message-components.md)
<a id="source-commands"></a>

### Commands

 **[Application commands](https://docs.discord.com/developers/interactions/application-commands)** let users call an app through native Discord UI, usually for core app capabilities. (Figure: Command launcher in the Desktop client) When defining a command, the app chooses a command type; that type controls where Discord shows it and what metadata arrives when a user invokes it. Application commands include these types:
- **Slash commands** are the usual command style, opened by typing `/` in the chat input or using the command picker.
- **Message commands** apply to a message or its content. Users open them from a message's context menu, such as the three-dot menu at the top-right or right-click menu, then the "Apps" section.
- **User commands** apply to a Discord user. Users access them by right-clicking a user profile and opening the "Apps" section.
- **Entry Point commands** are the main launch path for [Activities](https://docs.discord.com/developers/activities/overview) from the App Launcher.
 For command creation and command-interaction handling, use the [Application Commands](https://docs.discord.com/developers/interactions/application-commands) documentation.


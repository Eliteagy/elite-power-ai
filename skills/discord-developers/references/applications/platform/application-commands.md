# Application commands
[Source](components-discovery-and-platform-apis-index.md) / [Previous source section](claim-your-game.md) / [Following source section](application-commands.md)

<a id="source-application-commands"></a>

## Application Commands

Interactions power user-facing Discord app features. When a user runs a slash command, presses a button, chooses from a dropdown, or submits a modal, Discord sends the app an interaction payload that the app can answer directly. Apps receive interactions either over the Gateway or through HTTP requests to a configured endpoint. Both delivery models can support anything from a small command handler to a larger interactive system.

<a id="source-application-commands-1"></a>

### Application Commands

 [Application Commands](https://docs.discord.com/developers/interactions/application-commands) are the main way users invoke an app in Discord. The four command types are:
- **Slash commands:** opened by typing `/` in chat input
- **Message commands:** opened from a message context menu
- **User commands:** opened from a user profile context menu
- **Entry Point commands:** launch [Activities](https://docs.discord.com/developers/platform/activities) from the App Launcher
 When a command is invoked, Discord sends an interaction payload that the app can answer with a message, modal, or deferred response for longer work.

<a id="source-application-commands-2"></a>

### Application Commands

Create application commands of slash, message, user, and entry point types.

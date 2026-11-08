# Authorizing your application
Context: Discord developer reference: Authorizing your application
[Source](command-definitions-and-registration-index.md) / [Previous source section](application-command-option-choice-structure.md) / [Following source section](registering-a-command.md)
<a id="source-authorizing-your-application"></a>

### Authorizing Your Application

 Application commands use the [interactions](https://docs.discord.com/developers/interactions/receiving-and-responding) model and do not require a bot user in the guild. To create guild commands, authorize the app with `applications.commands`. This scope can stand alone and is automatically included with `bot`. Requesting it uses a shortcut OAuth2 flow similar to adding a bot; you do not need to finish an exchange for a token. If commands do not need a bot user in the guild, **do not add the bot scope or a permission bitfield to the URL**.


# Setting up commands
Context: Discord developer reference: Setting up commands
[Source](developing-a-user-installable-app-index.md) / [Previous source section](installing-your-app.md) / [Following source section](commands-in-the-sample-project.md)
<a id="source-step-2-setting-up-commands"></a>

### Step 2: Setting Up Commands

 Next, register the [application commands](https://docs.discord.com/developers/interactions/application-commands) for the app. Before changing code, understand command contexts:

Contexts for application commands

Short introduction to command contexts

Commands have two context fields that can be set when a command is created or updated. These fields limit the supported install methods and Discord surfaces for that command:
- **`integration_types`** controls which **[installation contexts](https://docs.discord.com/developers/interactions/application-commands#installation-context)** support a command: user, guild, or both. For example, the `/link` and `/profile` commands created in this guide are available only when the app is installed to a user.
- **`contexts`** sets the **[interaction contexts](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts)** where a command can be used, such as a guild channel, a DM with the bot user, or other DMs and GDMs. For example, the `/leaderboard` command created here is available only from a guild channel.
The [contexts](https://docs.discord.com/developers/interactions/application-commands#contexts) documentation has deeper command context details. In this tutorial, the sample app makes those concepts concrete by using them.


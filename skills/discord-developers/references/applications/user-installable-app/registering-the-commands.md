# Registering the commands
Context: Discord developer reference: Registering the commands
[Source](developing-a-user-installable-app-index.md) / [Previous source section](commands-in-the-sample-project.md) / [Following source section](handling-interactivity.md)
<a id="source-registering-the-commands"></a>

### Registering the commands

 Register the app's commands so they appear in Discord. From the project folder, run:

```
npm run register

```

 The register command calls the [Create Global Application Command](https://docs.discord.com/developers/interactions/application-commands#create-global-application-command) endpoint for each payload in `commands.js`. After the commands are created, open Discord and check the surfaces where they were made available:
- In channels for the guild where the app was installed, `/leaderboard`, `/wiki`, and `/profile` should be available
- In **channels within any of your guilds**, you should see `/wiki` and `/profile`
- In **your app's DM**, you should see `/wiki`, `/profile`, and `link`
- In **DMs or GDMs with other users**, you should see `/wiki` and `/profile`
 The commands will error until the interaction handler is configured.


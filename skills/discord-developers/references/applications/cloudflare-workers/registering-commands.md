# Registering commands
Context: Discord developer reference: Registering commands
[Source](hosting-on-cloudflare-workers-index.md) / [Previous source section](project-structure.md) / [Following source section](running-the-server.md)
<a id="source-registering-commands"></a>

### Registering commands

 Before testing, register the slash commands used by the app. This sample defines `/awwww` and `/invite`. Their names and descriptions are stored separately in `commands.js`:

```
export const AWW_COMMAND = {
  name: 'awwww',
  description: 'Drop some cuteness on this channel.',
};

export const INVITE_COMMAND = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
};

```

 `register.js` contains the command-registration code. Commands may be [registered globally](https://docs.discord.com/developers/interactions/application-commands#create-global-application-command) for every server where the app is installed, or [registered on a single server](https://docs.discord.com/developers/interactions/application-commands#create-guild-application-command). This example concentrates on global commands:

The complete program is in the [upstream source](https://raw.githubusercontent.com/discord/discord-api-docs/aaef8ae4c3398fcdabeec0d1dd5a3e69be587ad8/developers/tutorials/hosting-on-cloudflare-workers.mdx).


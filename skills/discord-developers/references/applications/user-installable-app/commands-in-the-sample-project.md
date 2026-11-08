# Commands in the sample project
Context: Discord developer reference: Commands in the sample project
[Source](developing-a-user-installable-app-index.md) / [Previous source section](setting-up-commands.md) / [Following source section](registering-the-commands.md)
<a id="source-commands-in-the-sample-project"></a>

### Commands in the sample project

 The sample app defines four commands with different contexts, summarized in the table below:
| Name | Description | Installation Contexts (`integration_types`) | Interaction Contexts (`contexts`) |
| --- | --- | --- | --- |
| `/leaderboard` | Show the game leaderboard for the current server | `GUILD_INSTALL` | `GUILD` |
| `/wiki` | Look up details about game items and characters | `GUILD_INSTALL`, `USER_INSTALL` | `GUILD`, `BOT_DM`, `PRIVATE_CHANNEL` |
| `/profile` | Show your game inventory and progress | `USER_INSTALL` | `GUILD`, `BOT_DM`, `PRIVATE_CHANNEL` |
| `/link` | Connect your game account to Discord | `USER_INSTALL` | `BOT_DM` |

 A command's supported installation contexts affect which interaction contexts it may use. `PRIVATE_CHANNEL` can be included in `contexts` only when `USER_INSTALL` is included in that command's `integration_types`. See the [documentation](https://docs.discord.com/developers/interactions/application-commands#contexts) for details. The command payloads live in `commands.js` in the project folder, where you can change values or inspect the `integration_types` and `contexts` fields for each command in the table.


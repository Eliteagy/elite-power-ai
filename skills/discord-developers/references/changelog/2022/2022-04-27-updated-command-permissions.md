# Updated Command Permissions

Date: 2022-04-27
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3843) · [Year index](INDEX.md)

<a id="source-updated-command-permissions"></a>


Application command permissions now provide more granular command access control in Discord. The main changes are summarized below; see [the updated documentation](https://docs.discord.com/developers/interactions/application-commands#permissions) for full details.

<a id="source-breaking-changes"></a>

#### Breaking changes

- Editing command permissions now requires Bearer tokens. These tokens are based on the permissions of the user who authenticated through [OAuth](https://docs.discord.com/developers/topics/oauth2), and that user needs permission to manage both the guild and its roles.
- [`applications.commands.permissions.update`](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) scope is now required to edit command permissions.
- The batch editing endpoint ([`PUT /applications/{application.id}/guilds/{guild.id}/commands/permissions`](https://docs.discord.com/developers/interactions/application-commands#batch-edit-application-command-permissions)) has been disabled.

<a id="source-other-changes"></a>

#### Other changes

- Added a [`CHANNEL` command permission type](https://docs.discord.com/developers/interactions/application-commands#application-command-permissions-object-application-command-permission-type)
- Increase permission limit from `10` to `100`
- Added a [constant (`guild_id - 1`)](https://docs.discord.com/developers/interactions/application-commands#application-command-permissions-object-application-command-permissions-constants) representing all channels in command permissions
- Added `default_member_permissions`, a string containing a bitwise OR-ed [permissions](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags) set. It replaces `default_permission`, which will soon be deprecated.
- Added `dm_permission`, a boolean that controls whether a global application command is available in DMs. If omitted, the global command is visible in DMs.
- Added `APPLICATION_COMMAND_PERMISSIONS_UPDATE` [gateway](https://docs.discord.com/developers/events/gateway-events#application-command-permissions-update) event and `APPLICATION_COMMAND_PERMISSION_UPDATE` [audit log](https://docs.discord.com/developers/resources/audit-log) event.

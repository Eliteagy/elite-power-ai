# Permissions
Context: Discord developer reference: Permissions
[Source](command-definitions-and-registration-index.md) / [Previous source section](interaction-contexts.md) / [Following source section](syncing-and-unsyncing-permissions.md)
<a id="source-permissions"></a>

### Permissions

 Application command permissions let an app enable or disable commands for up to 100 users, roles, and channels in a guild. Users with sufficient permissions can also edit command permissions in the client. These permissions can only be updated with a [Bearer token](https://docs.discord.com/developers/topics/oauth2#client-credentials-grant); bot-token authentication returns an error. Fetch current permissions with [`GET /applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`](https://docs.discord.com/developers/interactions/application-commands#get-application-command-permissions), which returns a `permissions` array containing IDs and permission types. Update them with [`PUT /applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`](https://docs.discord.com/developers/interactions/application-commands#edit-application-command-permissions). Calling the endpoint requires a Bearer token authorized with [`applications.commands.permissions.update`](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) from a user with enough permissions. For **the authenticating user**, not the app or bot user, all of these must be true:
- Has [permission to Manage Guild and Manage Roles](https://docs.discord.com/developers/topics/permissions) in the guild where the command is edited
- Can run the command being edited
- Can manage the affected resources, meaning roles, users, and/or channels depending on the [permission types](https://docs.discord.com/developers/interactions/application-commands#application-command-permissions-object-application-command-permission-type)


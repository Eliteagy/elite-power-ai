# Upcoming Application Command Permission Changes

Date: 2022-11-17
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3432) · [Year index](INDEX.md)

<a id="source-upcoming-application-command-permission-changes"></a>


Discord is revising [application commands](https://docs.discord.com/developers/interactions/application-commands) permissions based on feedback, with the goal of simplifying management and making command permissions behave more like other Discord permission systems. Server admins can opt in to the permissions changes described here per server **starting on December 16, 2022**. The change will not reach all servers **until late January or early February**. Existing behavior is described in [the application commands documentation](https://docs.discord.com/developers/interactions/application-commands#permissions) and [the changelog for the previous permissions update](https://docs.discord.com/developers/change-log#updated-command-permissions). The changes mainly affect how Discord clients apply configured permissions, so most apps need no action. Apps that use the [Update Permissions endpoint](https://docs.discord.com/developers/interactions/application-commands#edit-application-command-permissions) (`PUT /applications/<application_id>/guilds/<guild_id>/commands/<command_id>/permissions`) should review the details carefully.

<a id="source-types-of-command-permission-configurations"></a>

#### Types of command permission configurations

The following concepts remain the same, but they provide useful background. Discord clients decide whether a user can see or invoke a command using three permission configuration types:
- **Command-level permissions** are configured by an admin for one specific *command* in a server and affect only that command.
- **App-level permissions** are configured by an admin for one *app* in a server and affect all commands from that app.
- **`default_member_permissions`** are set by the app during command create or update. `default_member_permissions` apply to that command in *all* servers unless an override exists. See [the documentation](https://docs.discord.com/developers/interactions/application-commands#application-command-permissions-object-using-default-permissions) for `default_member_permissions` details.
These permission configuration concepts are unchanged, which leads to the question of what is changing.

<a id="source-whats-changing"></a>

### What’s changing?

Two command-permission changes are being introduced:
1. Discord clients will use new logic when applying permission configurations to a user in a specific context
2. A new `APPLICATION_COMMAND_PERMISSIONS_V2` guild feature flag indicates whether a guild is on the old or upcoming permission logic.
Both changes are described below.

<a id="source-1-how-permission-configurations-are-applied-in-discord"></a> <a id="source-current-behavior"></a>

#### 1. How permission configurations are applied in Discord

##### Current behavior:

Under the current system, configuration types are **mutually-exclusive**: only one permission configuration type determines whether a user may invoke a command. The hierarchy is command-level permissions first when present, then app-level permissions when present, and finally `default_member_permissions` if neither of the first two exists. This means:
- Any configured command-level permissions cause app-level permissions and `default_member_permissions` to be ignored for that command.
- Any configured app-level permissions cause `default_member_permissions` to be ignored for every command from that app.
This behavior can accidentally escalate permissions and make moderators recreate app-level settings when they only want a small command-level adjustment.

<a id="source-upcoming-behavior"></a>

##### Upcoming behavior:

The new model removes mutual exclusion, allowing multiple permission configuration types to combine when deciding command access. **`default_member_permissions` remains a developer-provided default for command creation or update.** **App-level permission configurations become the base configuration.** They define who may use the app and where, and they combine with `default_member_permissions`; a user granted app-level access still remains limited by each command's `default_member_permissions` by default. This prevents granting `/ban`, which requires `BAN_MEMBERS`, to `@BotMemers` simply because they have app access. **Command-level permission configurations become app-level overrides.** They override app-level settings and restrictions from `default_member_permissions`, so an admin can explicitly allow a user to use a command even if the app-level configuration denies them or they lack the command's `default_member_permissions`. If no command-level configuration exists for the context, Discord falls back to the app-level configuration.

<a id="source-flowchart-for-command-permissions-logic"></a>

##### Flowchart for command permissions logic

The simplified flowchart below shows how the Discord client applies permissions after the new behavior takes effect. (Figure: Flowchart with an overview of the new permissions configurations logic)

<a id="source-2-application_command_permissions_v2-guild-feature"></a>

#### 2. `APPLICATION_COMMAND_PERMISSIONS_V2` Guild Feature

Discord added [`APPLICATION_COMMAND_PERMISSIONS_V2` feature flag](https://docs.discord.com/developers/resources/guild#guild-object-guild-features) to show whether a server is using **the current permissions logic**.
- If the flag is present, the server still uses the old command permissions behavior.
- If the flag is absent, the server has moved from the old command permissions behavior to the new one.

<a id="source-am-i-affected"></a>

### Am I affected?

Only apps that call [`PUT /applications/<application_id>/guilds/<guild_id>/commands/<command_id>/permissions`](https://docs.discord.com/developers/interactions/application-commands#edit-application-command-permissions) are affected. This limited endpoint manages application command permissions for admins and requires the `applications.commands.permissions.update` scope. **Apps that do not use this endpoint have nothing to prepare for these changes.** Apps that do use it should follow the preparation guidance below.

<a id="source-how-do-i-prepare-for-the-changes"></a>

### How do I prepare for the changes?

Prepare for the change in two steps. **1. Use the `APPLICATION_COMMAND_PERMISSIONS_V2` flag** to detect which permission logic a server uses. During migration, code may need separate paths depending on whether the flag exists.

```
if 'APPLICATION_COMMAND_PERMISSIONS_V2' in guild.features:
     # Use current behaviors when interacting with endpoint
else:
     # Use new permissions behaviors when interacting with endpoint

```

If guild features are not already available from Gateway events, fetch them with [`GET /guilds/<guild_id>` endpoint](https://docs.discord.com/developers/resources/guild#get-guild). **2. Modify the behavior based on your use case**. Once the server's permission behavior is known, adjust how your app handles that server. Review what admins expect when your app updates command permissions. For dashboards, compare the dashboard logic and configured permissions against the new behavior. For documentation that explains command-permission behavior, remap those explanations to the new model. If the correct mapping is unclear, ask admin users whether the new logic matches their expectations.

<a id="source-what-happens-if-i-dont-update-my-app"></a>

#### What happens if I don’t update my app?

Affected apps that do not update may configure permission behavior that differs from both developer intent and user expectations.

<a id="source-how-long-do-i-have-to-update-my-app"></a>

#### How long do I have to update my app?

The `APPLICATION_COMMAND_PERMISSIONS_V2` flag is already live and should appear in guild feature flags. New permission behavior rolls out **on December 16, 2022**, when admins start seeing a banner that lets them optionally migrate their server. In **late January or early February**, all servers move to the new behavior. Discord will publish another changelog then, after which old-behavior logic can be removed.

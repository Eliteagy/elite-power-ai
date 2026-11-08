# Adding scopes and bot permissions
Context: Discord developer reference: Adding scopes and bot permissions
[Source](app-registration-and-commands-index.md) / [Previous source section](setting-up-an-install-link.md) / [Following source section](installing-your-app.md)
<a id="source-adding-scopes-and-bot-permissions"></a>

### Adding scopes and bot permissions

 Installing users must grant apps approval before the app can take Discord actions, such as creating slash commands or reading a server member list. Add scopes and bot permissions before installing the app.

What are scopes and permissions?

Introduction to scopes and bot permissions

When you create an app, scopes and permissions define what it may access and do in Discord.
- [OAuth2 Scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) define data access and actions granted on behalf of an installing or authenticating user.
- [Permissions](https://docs.discord.com/developers/topics/permissions#permission-overwrites) are granular bot-user permissions, like the permissions regular Discord users have. The installing user can approve them, and they can later be changed in server settings or with [permission overwrites](https://docs.discord.com/developers/topics/permissions#permission-overwrites). Because user-context apps can only answer commands, these permissions matter only for server-installed apps.
 On the [**Installation** page](https://discord.com/developers/applications/select/installation), use the **Default Install Settings** section:
- For **User Install**, add the `applications.commands` scope
- For **Guild Install**, add the `applications.commands` scope and the `bot` scope. Selecting `bot` opens a **Permissions** menu for choosing bot-user permissions. Select the permissions the app may need; for now, select `Send Messages`.
 (Figure: Default Install Settings) See the full list of [OAuth2 scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes), or read the [permissions](https://docs.discord.com/developers/topics/permissions) documentation.


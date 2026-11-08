# Configuring default install settings
Context: Discord developer reference: Configuring default install settings
[Source](developing-a-user-installable-app-index.md) / [Previous source section](choosing-supported-installation-contexts.md) / [Following source section](installing-your-app.md)
<a id="source-configuring-default-install-settings"></a> <a id="source-update-install-link"></a> <a id="source-adding-default-install-settings"></a>

### Configuring Default Install Settings

 Default install settings define the default [scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) and [bot user permissions](https://docs.discord.com/developers/topics/permissions) for each supported installation context. User-context installs currently support only the `applications.commands` scope in default install settings; that scope lets the app install [commands](https://docs.discord.com/developers/interactions/application-commands).

###### Update Install Link

 Before adding default install settings, set the app's [install link](https://docs.discord.com/developers/resources/application#install-links) to Discord Provided Link. In **Install Link**, choose `Discord Provided Link` from the dropdown if it is not already selected. After that selection, **Default Install Settings** appears.

###### Adding Default Install Settings

 In **Default Install Settings**:
- For **User Install**, add the `applications.commands` scope
- For **Guild Install**, add the `applications.commands` scope and the `bot` scope. Selecting `bot` reveals a **Permissions** menu for bot user permissions. Choose the permissions your app needs; for the sample, select `Send Messages`.
 Bot user permissions work much like permissions for other Discord users. The [Permissions](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags) page lists available permissions and explains them. After selecting the app's scopes and permissions, click **Save Changes**. (Figure: Installation settings in App Settings)


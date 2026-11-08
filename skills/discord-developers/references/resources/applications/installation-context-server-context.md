# Installation context server context
Context: Discord developer reference: Installation context server context
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Owning endpoint, event, object or procedure conditions](application-object-installation-context.md) / [Following source section](installation-context-user-context.md)
<a id="source-server-context"></a>

#### Server Context

 Apps installed in a server context, or server-installed apps, require authorization from a server member who has [`MANAGE_GUILD`](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags). Everyone in the server can see a server-installed app, while controls such as [command permissions](https://docs.discord.com/developers/interactions/application-commands#permissions) determine who can use specific app features and where. During installation, the app receives selected [OAuth2 scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) and [bot user permissions](https://docs.discord.com/developers/topics/permissions), which define its access to server resources and data.


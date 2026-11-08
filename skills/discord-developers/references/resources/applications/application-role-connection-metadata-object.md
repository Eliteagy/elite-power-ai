# Application role connection metadata object
Context: Discord developer reference: Application role connection metadata object
[Source](application-objects-and-endpoints-index.md) / [Previous source section](get-application-activity-instance.md) / [Following source section](application-role-connection-metadata-structure.md)
<a id="source-application-role-connection-metadata-object"></a>

## Application Role Connection Metadata Object

Application role connection metadata represents metadata for an [application](https://docs.discord.com/developers/resources/application). When a guild adds a bot whose [`role_connections_verification_url`](https://docs.discord.com/developers/resources/application#application-object) is configured in the developer portal, that application can appear as a verification method in the guild's role verification configuration. If the application has role connection metadata configured, that metadata appears when the application is added as a verification method for the role. When a user connects an account through the bot's [`role_connections_verification_url`](https://docs.discord.com/developers/resources/application#application-object), the bot can [update a user's role connection with metadata](https://docs.discord.com/developers/resources/user#update-current-user-application-role-connection) by using the OAuth2 `role_connections.write` scope.


# Add Application Connections Metadata and Linked Roles

Date: 2022-12-12
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3402) · [Year index](INDEX.md)

<a id="source-add-application-connections-metadata-and-linked-roles"></a>


Discord introduced [linked roles](https://discord.com/blog/connected-accounts-functionality-boost-linked-roles) and lets developers configure linked roles for their own applications. This includes:
- New [`role_connections_verification_url`](https://docs.discord.com/developers/resources/application#application-object), configurable in the developer portal so the application can appear as a linked-role verification option.
- [Application metadata](https://docs.discord.com/developers/resources/application-role-connection-metadata#application-role-connection-metadata-object) for expressing more precise linked-role requirements.
- New endpoints to [retrieve](https://docs.discord.com/developers/resources/application-role-connection-metadata#get-application-role-connection-metadata-records) (`GET /applications/<application.id>/role-connections/metadata`) and [update](https://docs.discord.com/developers/resources/application-role-connection-metadata#update-application-role-connection-metadata-records) (`PUT /applications/<application.id>/role-connections/metadata`) application connection metadata.
- New [`role_connections.write`](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) OAuth2 scope, required for the requests below.
- Endpoints to [retrieve](https://docs.discord.com/developers/resources/user#get-current-user-application-role-connection) (`GET /users/@me/applications/{application.id}/role-connection`) and [update](https://docs.discord.com/developers/resources/user#update-current-user-application-role-connection) (`PUT /users/@me/applications/{application.id}/role-connection`) a user's role connections; both return an [application role connection](https://docs.discord.com/developers/resources/user#application-role-connection-object) object.
For a quick setup path for linked roles, see the [tutorial](https://docs.discord.com/developers/tutorials/configuring-app-metadata-for-linked-roles).

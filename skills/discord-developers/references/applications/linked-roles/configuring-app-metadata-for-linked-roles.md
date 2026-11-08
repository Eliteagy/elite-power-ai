# Configuring app metadata for linked roles
Context: Discord developer reference: Configuring app metadata for linked roles
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Following source section](creating-an-app.md)
<a id="source-configuring-app-metadata-for-linked-roles"></a>

# Configuring App Metadata For Linked Roles

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Linked roles in Discord require a user to connect an external service and satisfy configured conditions. The condition may be simply connecting that service, or it can be more specific, such as a verified account, required stats, or a follower threshold. Apps may publish their own [role connection metadata](https://docs.discord.com/developers/resources/application-role-connection-metadata), which server admins use when setting up linked roles for servers where the app is installed. The app also needs an [OAuth2 flow](https://docs.discord.com/developers/topics/oauth2) so users can authenticate and approve the `role_connections.write` scope. This tutorial builds a JavaScript Discord app that supports linked roles. The complete sample appears in the [`linked-roles-sample` GitHub repo](https://github.com/discord/linked-roles-sample).

---


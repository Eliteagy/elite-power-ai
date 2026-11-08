# Adding scopes
Context: Discord developer reference: Adding scopes
[Source](configuring-app-metadata-for-linked-roles-index.md) / [Previous source section](creating-an-app.md) / [Following source section](installing-your-app.md)
<a id="source-adding-scopes"></a>

### Adding scopes

 An installing user must approve the app before it can act within Discord. Add the scopes that the installation flow should request before installing the app.
- In the left sidebar, open [OAuth2](https://discord.com/developers/applications/select/oauth2/url-generator), then choose `URL generator`
- Check the `bot` scope
- After choosing the scope, the page shows a **Generated URL** that can install the app
 For more detail, review all [OAuth2 scopes](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes) or the documentation on [user permissions](https://docs.discord.com/developers/topics/permissions).


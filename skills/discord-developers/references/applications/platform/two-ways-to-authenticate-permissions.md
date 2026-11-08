# Two ways to authenticate permissions
Context: Discord developer reference: Two ways to authenticate permissions
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](two-ways-to-authenticate.md) / [Previous source section](two-ways-to-authenticate-scopes.md) / [Following source section](two-ways-to-authenticate-oauth2-reference.md)
<a id="source-permissions"></a>

### Permissions

 Permissions define the actions a **bot** may perform at server scope or within individual channels. When a bot is installed through OAuth2, the server admin grants permissions that are stored as a bitfield. Permissions can be:
- **Guild-level:** Apply across the whole server
- **Channel-level:** Override behavior for selected channels
 Request only the permissions the app needs. Overly broad permissions reduce user trust and should be avoided under the [Developer Policy](https://support-dev.discord.com/hc/en-us/articles/8563934450327-Discord-Developer-Policy).


# OAuth2 user token
Context: Discord developer reference: OAuth2 user token
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](two-ways-to-authenticate.md) / [Previous source section](two-ways-to-authenticate-bot-token.md) / [Following source section](two-ways-to-authenticate-scopes.md)
<a id="source-oauth2-user-token"></a>

### OAuth2 User Token

 To act for a user, use OAuth2 to obtain a user access token. The user signs in with Discord and authorizes the app for chosen scopes. **User tokens:**
- Allow the app to read or write data for the user within the requested scopes
- Are scoped, limiting access to what the user approved
- Expire quickly and require refresh
- Must be protected like passwords and never exposed publicly


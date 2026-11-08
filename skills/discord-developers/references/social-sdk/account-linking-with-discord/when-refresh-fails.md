# When refresh fails
Context: Discord developer reference: When refresh fails
[Source](account-linking-with-discord-index.md) / [Previous source section](refreshing-access-tokens-for-public-clients.md) / [Following source section](recovering-from-invalid-grant.md)
<a id="source-when-refresh-fails"></a>

### When Refresh Fails

 A saved refresh token can become unusable between sessions for several reasons:
- The user removed your application from *User Settings -> Authorized Apps*.
- Your app called the unmerge endpoint or the token revocation endpoint.
- The [user's Discord account was banned](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#ban-driven-unmerge).
- The access and refresh tokens expired or became invalid for a reason unrelated to revocation, unmerge, or ban.
 All of those situations produce the same `/oauth2/token` response when `grant_type=refresh_token` is used:
- **HTTP status:** `400`
- **Body:** `{ "error": "invalid_grant", "error_description": "Invalid \"refresh_token\" in request" }`
 This endpoint has no error code that identifies a ban or unlink. `invalid_grant` only means the refresh token is no longer valid on the server; it does not reveal which cause applies.


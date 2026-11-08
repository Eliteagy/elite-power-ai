# Unmerging provisional accounts
Context: Discord developer reference: Unmerging provisional accounts
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](merge-request-failures.md) / [Following source section](unmerging-provisional-accounts-for-servers.md)
<a id="source-unmerging-provisional-accounts"></a>

### Unmerging Provisional Accounts

 A Discord account and provisional account link can be broken in four ways:
1. The user unmerges from the Discord client
2. A developer calls the Discord API unmerge endpoint
3. A developer uses the SDK helper for public clients
4. If Discord bans the user's Discord account, Discord automatically breaks the link; see Ban-Driven Unmerge below
 Unmerge completion invalidates every access token and refresh token for that user, so none of them can be reused. Connected game sessions are disconnected. The `external_auth_token` from the original provisional account setup remains valid. After unmerge finishes, reuse that same token to fetch the new provisional token for the newly created provisional account.


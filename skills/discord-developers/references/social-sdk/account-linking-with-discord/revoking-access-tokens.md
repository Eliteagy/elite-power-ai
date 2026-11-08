# Revoking access tokens
Context: Discord developer reference: Revoking access tokens
[Source](account-linking-with-discord-index.md) / [Previous source section](recovering-from-invalid-grant.md) / [Following source section](server-to-server-token-revocation.md)
<a id="source-revoking-access-tokens"></a>

### Revoking Access Tokens

 A user's app authorization may be revoked by your backend, by the user in Discord's UI, or by Discord when an account is banned. No matter which path causes the revocation:
- The user's access and refresh tokens become invalid immediately. Later refresh attempts on `/oauth2/token` return `HTTP 400` with `error: "invalid_grant"`; see When Refresh Fails.
- Discord sends an [`APPLICATION_DEAUTHORIZED`](https://docs.discord.com/developers/events/webhook-events#application-deauthorized) webhook to your app.
 In apps that use the Discord Social SDK, each revocation route in this section acts as an [unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#unmerging-provisional-accounts): the merged Discord account becomes a new provisional account that retains the original `external_auth_token`. This is true for `/oauth2/token/revoke`, `Client::RevokeToken`, user removal through Discord's UI, and bans. Only [ban-driven unmerges](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#ban-driven-unmerge) create a *restricted* provisional account; the other paths create an unrestricted provisional account that can be merged again. Your own code will know when it initiates revocation. For revocations outside your code, covered in Out-of-Band Revocation below, the webhook is the only proactive signal. Revoking any valid access or refresh token immediately invalidates every access and refresh token your application has for that user.


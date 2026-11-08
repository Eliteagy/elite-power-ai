# Account Linking Failure Modes

Date: 2026-05-22
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L594) · [Year index](INDEX.md)

<a id="source-account-linking-failure-modes"></a>


Social SDK documentation now explains what happens when the Discord-to-game account link is broken, whether through a Discord account ban, explicit unmerge, or OAuth2 token revocation. Highlights:
- **[Ban-Driven Unmerge](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#ban-driven-unmerge)** explains the lifecycle after a Discord account ban. Discord deletes the tokens immediately, creates a cross-platform-restricted provisional account tied to the original external identity, and returns [`530017`](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#merge-request-failures) for merge attempts until the ban ends, or permanently for permanent bans.
- **[Out-of-Band Revocation](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#out-of-band-revocation)** covers the auth-side signals: the `APPLICATION_DEAUTHORIZED` webhook and `invalid_grant` during refresh. These appear when a user removes your app from Discord or when that Discord account is banned.
- **[When Refresh Fails](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#when-refresh-fails)** documents the `/oauth2/token` response returned after the underlying token is deleted and recommends treating `invalid_grant` like the webhook.

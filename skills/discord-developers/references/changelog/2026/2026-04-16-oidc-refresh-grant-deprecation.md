# Deprecation: OAuth2 Refresh Token Grant for OIDC Provisional Accounts

Date: 2026-04-16
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L741) · [Year index](INDEX.md)

<a id="source-deprecation-oauth2-refresh-token-grant-for-oidc-provisional-accounts"></a>


For [OIDC server-side authentication](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#server-authentication-with-external-credentials-exchange) with provisional accounts, a `refresh_token` is returned, but using it through the OAuth2 `refresh_token` grant is deprecated. This aligns OIDC with other provisional account authentication methods: when a token expires, re-authenticate with a fresh provider token and pass the new access token to [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4). See [Refreshing Provisional Account Tokens](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#refreshing-provisional-account-tokens) for details.

# Security Updates for Provisional Account OIDC Integrations

Date: 2026-04-22
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L698) · [Year index](INDEX.md)

<a id="source-security-updates-for-provisional-account-oidc-integrations"></a>


Discord has strengthened validation for OIDC issuer URLs and OIDC configuration fetching for [provisional accounts](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts). The checks now include stricter host validation and reject HTTP redirects while loading configuration or JWKS data. **Existing provisional account OIDC integrations are not affected** and keep working without changes. If you edit OIDC configuration in the [Developer Portal](https://discord.com/developers/applications/select/social-sdk/external-auth-providers), the updated configuration is validated against the new requirements. New [OIDC Integration Requirements](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#oidc-integration-requirements) documentation lists the issuer URL constraints, discovery-document rules, supported signing algorithms, and ID token claim requirements. Review those requirements and verify the configuration in a test application before changing a production integration.

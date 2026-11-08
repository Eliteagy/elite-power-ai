# Merging provisional accounts for servers
Context: Discord developer reference: Merging provisional accounts for servers
[Source](authentication-and-merging-index.md) / [Previous source section](merging-provisional-accounts.md) / [Following source section](desktop-mobile-request-body-parameters.md)
<a id="source-merging-provisional-accounts-for-servers"></a>

### Merging Provisional Accounts for Servers

 To merge a provisional account, extend the standard [OAuth2 token exchange](https://docs.discord.com/developers/topics/oauth2#authorization-code-grant-access-token-exchange-example) by posting to `/oauth2/token` with `external_auth_type` and `external_auth_token`. Those fields let Discord find the matching provisional identity and attach it to the full Discord account associated with the authorization code or device code. The External Auth Types table lists supported `external_auth_type` values. `external_auth_token` is the credential used when creating the provisional account, such as an OIDC identity token, Steam session ticket, or EOS access token. If the Bot Token Endpoint created the provisional account, set `external_auth_type` to `DISCORD_BOT_ISSUED_ACCESS_TOKEN` and set `external_auth_token` to `external_user_id` (your game account ID).


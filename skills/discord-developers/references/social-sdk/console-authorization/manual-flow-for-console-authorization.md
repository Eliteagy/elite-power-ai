# Manual flow for console authorization
Context: Discord developer reference: Manual flow for console authorization
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](automatic-token-handling.md) / [Following source section](request-a-device-code-from-discord.md)
<a id="source-manual-flow-for-console-authorization"></a>

### Manual Flow for Console Authorization

 For manual console authorization, use these steps. The flow is the same OAuth2 device authorization process as the automatic method, but your code handles polling and token exchange.
1. [Request a device code from Discord](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-on-consoles#step-1-request-a-device-code-from-discord)
2. [Display the user verification information](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-on-consoles#step-2-display-authorize-screen-with-qr-code-and-user-code) or optionally open the authorization screen
3. [Poll for the userÃ¢â‚¬â„¢s authorization](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-on-consoles#step-3-poll-for-users-authorization)
4. [Exchange the device code for an access token](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-on-consoles#step-4-exchange-device-code-for-access-token)
5. [Handle the token response](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-on-consoles#step-5-handle-token-response) and optionally close the authorization screen


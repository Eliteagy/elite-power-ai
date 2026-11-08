# Choosing an authentication method
Context: Discord developer reference: Choosing an authentication method
[Source](authentication-and-merging-index.md) / [Previous source section](benefits.md) / [Following source section](configuring-your-identity-provider.md)
<a id="source-getting-set-up"></a> <a id="source-choosing-an-authentication-method"></a>

### Getting Set Up

### Choosing an Authentication Method

 Discord provides several authentication methods; choose based on how your game and account system are built:
1. Use the [Bot Token Endpoint](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#server-authentication-with-bot-token-endpoint) when your game account system uniquely identifies users. This is the recommended approach when available.
2. Use [Server Authentication with External Credentials Exchange](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#server-authentication-with-external-credentials-exchange) when you have an OIDC provider or no account system.
3. Use the [Client Side Token Exchange Method](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#authentication-for-public-clients) when using a Public Client.
 When using (2) or (3), configure your identity provider before creating provisional accounts.


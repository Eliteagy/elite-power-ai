# Configuring your identity provider
Context: Discord developer reference: Configuring your identity provider
[Source](authentication-and-merging-index.md) / [Previous source section](choosing-an-authentication-method.md) / [Following source section](external-auth-types.md)
<a id="source-configuring-your-identity-provider"></a>

### Configuring Your Identity Provider

 The bot token endpoint does not require Identity Provider configuration. Open the Discord app for your game in the [Developer Portal](https://discord.com/developers/applications). In the sidebar's `Discord Social SDK` section, open [External Auth](https://discord.com/developers/applications/select/social-sdk/external-auth-providers). Select `Add Auth Provider`, choose the provider type such as Steam or OIDC, and enter the required provider details. Supported provider types are:
- OpenID Connect (OIDC)
- Steam Session Tickets
- Epic Online Services (EOS)
- Unity
- Apple
- PlayStation Network (PSN)
 For OIDC configuration, OIDC Integration Requirements lists the issuer URL, discovery document, and ID token requirements. Discord represents providers with these types:


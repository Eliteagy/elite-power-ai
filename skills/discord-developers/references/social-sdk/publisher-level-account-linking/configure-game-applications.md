# Configure game applications
Context: Discord developer reference: Configure game applications
[Source](publisher-level-account-linking-index.md) / [Previous source section](configure-the-publisher-application.md) / [Following source section](establish-parent-child-relationships.md)
<a id="source-2-configure-game-applications"></a>

### 2. Configure Game Applications

 For each game application:
1. Create another application in the [Developer Portal](https://discord.com/developers/applications)
2. Enable Social SDK integration
3. **Do not configure OAuth2 redirect URIs** - child game applications do not use them
4. Record the application's Client ID
 Game applications do not need OAuth2 setup because their tokens come from the parent application's exchange flow.


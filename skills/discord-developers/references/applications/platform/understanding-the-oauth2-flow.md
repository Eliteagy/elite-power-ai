# Understanding the OAuth2 flow
Context: Discord developer reference: Understanding the OAuth2 flow
[Source](accounts-games-and-commerce-index.md) / [Owning endpoint, event, object or procedure conditions](what-is-account-linking.md) / [Previous source section](what-is-account-linking-for-developers.md) / [Following source section](two-ways-to-link.md)
<a id="source-how-account-linking-works"></a> <a id="source-understanding-the-oauth2-flow"></a>

### How Account Linking Works

### Understanding the OAuth2 Flow

 Account linking uses OAuth2, the standard authorization protocol. A player link follows this sequence:
1. **Your game requests that Discord begin the OAuth flow.**
2. **Discord presents an OAuth modal where the player approves your game and the requested OAuth scopes.**
3. **The player approves** (authorizes).
4. **Discord returns a temporary access token** that proves the player granted authorization.
5. **Your game uses that token** to call Discord social features for the player.
 You do not have to build OAuth2 yourself. The Discord Social SDK manages authorization, tokens, and API calls for the game. Web Flow uses standard OAuth2, so most web frameworks already have suitable support. The access token is scoped, which limits it to the Discord capabilities your game requested. For common setups, the SDK exposes `GetDefaultPresenceScopes` to cover friends plus presence and `GetDefaultCommunicationScopes` to cover voice, lobbies, and messaging. Read the [OAuth2 Scopes for Social SDK page](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) for the complete scope details. (Figure: Account Linking in Action)


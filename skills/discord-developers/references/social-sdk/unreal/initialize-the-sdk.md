# Initialize the SDK
Context: Discord developer reference: Initialize the SDK
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](add-the-discord-sdk-to-the-project.md) / [Following source section](discord-local-player-subsystem.md)
<a id="source-step-6-initialize-the-sdk"></a>

### Step 6: Initialize the SDK

 Next, add callbacks for SDK logging, SDK status, and OAuth2 authentication so Discord account linking works. The flow will:
1. Open Discord login in the Discord app or a browser
2. Get an authorization code
3. Trade that code for an access token
4. Connect to Discord
 **Choosing your OAuth2 scopes:** This walkthrough uses `UDiscordClient::GetDefaultPresenceScopes()`, which asks for `openid` and `sdk.social_layer_presence`. Those scopes support core behavior such as account linking, friends list access, and rich presence. If the game also needs lobbies, voice chat, or direct messages, switch to `UDiscordClient::GetDefaultCommunicationScopes()`. The [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) explains the full scope set. Open `DiscordSocialUnrealCharacter.h` in Visual Studio to begin integrating the Social SDK.


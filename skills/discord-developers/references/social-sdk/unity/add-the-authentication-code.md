# Add the authentication code
Context: Discord developer reference: Add the authentication code
[Source](unity-setup-and-authentication-index.md) / [Previous source section](account-linking-with-discord.md) / [Following source section](oauth-flow-explanation.md)
<a id="source-add-the-authentication-code"></a>

### Add the Authentication Code

 **Choosing your OAuth2 scopes:** This walkthrough uses `Client.GetDefaultPresenceScopes()` and requests `openid` plus `sdk.social_layer_presence`. These scopes cover account linking, friends list access, and rich presence. Games that need lobbies, voice chat, or direct messaging should use `Client.GetDefaultCommunicationScopes()` instead. The [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) has the complete breakdown. Start by adding this code to `DiscordManager.cs`:

```
private void StartOAuthFlow() {
    var authorizationVerifier = client.CreateAuthorizationCodeVerifier();
    codeVerifier = authorizationVerifier.Verifier();

    var args = new AuthorizationArgs();
    args.SetClientId(clientId);
    args.SetScopes(Client.GetDefaultPresenceScopes());
    args.SetCodeChallenge(authorizationVerifier.Challenge());
    client.Authorize(args, OnAuthorizeResult);
}

private void OnAuthorizeResult(ClientResult result, string code, string redirectUri) {
    Debug.Log($"Authorization result: [{result.Error()}] [{code}] [{redirectUri}]");
    if (!result.Successful()) {
        return;
    }
    GetTokenFromCode(code, redirectUri);
}

private void GetTokenFromCode(string code, string redirectUri) {
    client.GetToken(clientId,
                    code,
                    codeVerifier,
                    redirectUri,
                    (result, token, refreshToken, tokenType, expiresIn, scope) => {});
}

```

 After that, uncomment `loginButton.onClick.AddListener(StartOAuthFlow);` in `Start()`

```
if (loginButton != null)
{
    loginButton.onClick.AddListener(StartOAuthFlow);
}

```


# Relationships manager OAuth
Context: DiscordManager.cs complete Unity integration through Step9 relationships. Linked fragments form one program; not standalone declarations.
[Source](unity-relationships-and-presence-index.md) / [Required complete example component](relationships-manager-lifecycle.md) / [Reviewed program owner and required setup](project-setup.md) / [Reviewed program owner and required setup](setting-up-sdk-event-handling.md) / [Reviewed program owner and required setup](account-linking-with-discord.md) / [Reviewed program owner and required setup](connect-the-sdk-to-discord.md) / [Reviewed program owner and required setup](access-discord-relationships.md) / [Following source section](set-rich-presence.md)

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
                        (result, token, refreshToken, tokenType, expiresIn, scope) => {
                            if (token != "") {
                                OnReceivedToken(token);
                            } else {
                                OnRetrieveTokenFailed();
                            }
                        });
    }

    private void OnReceivedToken(string token) {
        Debug.Log("Token received.");
        client.UpdateToken(AuthorizationTokenType.Bearer, token, (ClientResult result) => { if (result.Successful()) client.Connect(); });
    }

    private void OnRetrieveTokenFailed() { statusText.text = "Failed to retrieve token"; }
}

```

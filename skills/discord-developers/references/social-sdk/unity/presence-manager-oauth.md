# Presence manager OAuth
Context: Owner is full DiscordManager.cs at173. Keep ClientReady entire with UpdateRichPresence callback; preserve declarations in previous phase and all OAuth functions.
[Source](unity-relationships-and-presence-index.md) / [Required complete example component](presence-manager-lifecycle.md) / [Exact example stage and preceding setup](rich-presence-troubleshooting.md) / [Following source section](conclusion.md)

```
    private void ClientReady()
    {
            Debug.Log($"Friend Count: {client.GetRelationships().Count()}");

            Activity activity = new Activity();
            activity.SetType(ActivityTypes.Playing);
            activity.SetState("In Competitive Match");
            activity.SetDetails("Rank: Diamond II");
            client.UpdateRichPresence(activity, (ClientResult result) => {
                if (result.Successful()) {
                    Debug.Log("Rich presence updated!");
                } else {
                    Debug.LogError("Failed to update rich presence");
                }
            });
    }

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

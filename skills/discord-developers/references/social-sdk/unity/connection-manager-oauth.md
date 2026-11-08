# Connection manager OAuth
Context: Same DiscordManager class at this tutorial stage; link inspector clientId/button/status setup and both fragments. All methods and callback closures remain whole.
[Source](unity-setup-and-authentication-index.md) / [Required complete example component](connection-manager-setup.md) / [Exact example stage and preceding setup](connection-troubleshooting.md) / [Following source section](connection-callback-troubleshooting.md)

```
    private void OnLog(string message, LoggingSeverity severity)
    {
        Debug.Log($"Log: {severity} - {message}");
    }

    private void OnStatusChanged(Client.Status status, Client.Error error, int errorCode)
    {
        Debug.Log($"Status changed: {status}");
        statusText.text = status.ToString();
        if(error != Client.Error.None)
        {
            Debug.LogError($"Error: {error}, code: {errorCode}");
        }
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

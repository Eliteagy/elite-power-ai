# Connect the SDK to discord
Context: Discord developer reference: Connect the SDK to discord
[Source](unity-setup-and-authentication-index.md) / [Previous source section](oauth-manager-program.md) / [Following source section](token-update-connection-lifecycle.md)
<a id="source-step-8-connect-the-sdk-to-discord"></a>

---

### Step 8: Connect the SDK to Discord

 With an access token available, connect the SDK to Discord. Start by adding this code to `DiscordManager.cs`:

```
private void OnReceivedToken(string token) {
    Debug.Log("Token received.");
    client.UpdateToken(AuthorizationTokenType.Bearer, token, (ClientResult result) => { if (result.Successful()) client.Connect(); });
}

private void OnRetrieveTokenFailed() { statusText.text = "Failed to retrieve token"; }

```

 Then change `GetTokenFromCode` so it calls these functions when finished:

```
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

```


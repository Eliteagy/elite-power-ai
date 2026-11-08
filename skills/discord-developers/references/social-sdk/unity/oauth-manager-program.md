# OAuth manager program
Context: Discord developer reference: OAuth manager program
[Source](unity-setup-and-authentication-index.md) / [Owning endpoint, event, object or procedure conditions](oauth-flow-troubleshooting.md) / [Following source section](connect-the-sdk-to-discord.md)

```
using UnityEngine;
using UnityEngine.UI;
using Discord.Sdk;
using System.Linq;

public class DiscordManager : MonoBehaviour
{
    [SerializeField]
    private ulong clientId; // Set this in the Unity Inspector from the dev portal

    [SerializeField]
    private Button loginButton;

    [SerializeField]
    private Text statusText;

    private Client client;
    private string codeVerifier;

        void Start()
    {
        client = new Client();

        // Modifying LoggingSeverity will show you more or less logging information
        client.AddLogCallback(OnLog, LoggingSeverity.Error);
        client.SetStatusChangedCallback(OnStatusChanged);

        // Make sure the button has a listener
        if (loginButton != null)
        {
            loginButton.onClick.AddListener(StartOAuthFlow);
        }
        else
        {
            Debug.LogError("Login button reference is missing, connect it in the inspector!");
        }

        // Set initial status text
        if (statusText != null)
        {
            statusText.text = "Ready to login";
        }
        else
        {
            Debug.LogError("Status text reference is missing, connect it in the inspector!");
        }
    }

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
                        (result, token, refreshToken, tokenType, expiresIn, scope) => {});
    }
}

```


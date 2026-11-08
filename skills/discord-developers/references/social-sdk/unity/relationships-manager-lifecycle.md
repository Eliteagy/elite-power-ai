# Relationships manager lifecycle
Context: DiscordManager.cs complete Unity integration through Step9 relationships. Linked fragments form one program; not standalone declarations.
[Source](unity-relationships-and-presence-index.md) / [Source](unity-setup-and-authentication-index.md) / [Required complete example component](relationships-manager-oauth.md) / [Reviewed program owner and required setup](project-setup.md) / [Reviewed program owner and required setup](setting-up-sdk-event-handling.md) / [Reviewed program owner and required setup](account-linking-with-discord.md) / [Reviewed program owner and required setup](connect-the-sdk-to-discord.md) / [Reviewed program owner and required setup](access-discord-relationships.md) / [Previous source section](relationships-troubleshooting.md)
<a id="source-using-unity-part-2"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

DiscordManager.cs at this stage
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

        if (status == Client.Status.Ready)
        {
            ClientReady();
        }
    }

    private void ClientReady()
    {
        Debug.Log($"Friend Count: {client.GetRelationships().Count()}");
    }

```

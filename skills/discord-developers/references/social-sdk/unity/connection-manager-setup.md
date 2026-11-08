# Connection manager setup
Context: Same DiscordManager class at this tutorial stage; link inspector clientId/button/status setup and both fragments. All methods and callback closures remain whole.
[Source](unity-setup-and-authentication-index.md) / [Required complete example component](connection-manager-oauth.md) / [Exact example stage and preceding setup](connection-troubleshooting.md)

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

```

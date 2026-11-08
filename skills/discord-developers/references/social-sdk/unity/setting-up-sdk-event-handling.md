# Setting up SDK event handling
Context: Discord developer reference: Setting up SDK event handling
[Source](unity-setup-and-authentication-index.md) / [Previous source section](unity-runtime-configuration.md) / [Following source section](what-these-callbacks-do.md)
<a id="source-step-6-setting-up-sdk-event-handling"></a>

### Step 6: Setting Up SDK Event Handling

 Add event handlers so the Unity project can observe the Discord connection. Two callbacks are important:
- A logging callback that exposes SDK activity
- A status callback that reports when Discord features are ready to use
 Begin by adding this code to `DiscordManager.cs`:

```
void Start()
{
    client = new Client();

    // Modifying LoggingSeverity will show you more or less logging information
    client.AddLogCallback(OnLog, LoggingSeverity.Error);
    client.SetStatusChangedCallback(OnStatusChanged);

    // Make sure the button has a listener
    if (loginButton != null)
    {
        //loginButton.onClick.AddListener(StartOAuthFlow);
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

```

 This wires API status updates into the in-game text. Copy your Client ID from the developer portal [OAuth2 tab](https://discord.com/developers/applications/select/oauth2) and place it in ClientID on **DiscordManager** in the inspector.


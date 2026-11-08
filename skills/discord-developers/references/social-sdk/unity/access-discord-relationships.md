# Access discord relationships
Context: Discord developer reference: Access discord relationships
[Source](unity-setup-and-authentication-index.md) / [Previous source section](connection-callback-troubleshooting.md) / [Following source section](relationships-result.md)
<a id="source-step-9-access-discord-relationships"></a>

### Step 9: Access Discord Relationships

 Read the user's Discord relationships, also called the friends list, and print the count. This shows how to retrieve Discord data for use in the game. Add this code to `DiscordManager.cs`:

```
private void ClientReady()
{
    Debug.Log($"Friend Count: {client.GetRelationships().Count()}");
}

```

 Call it once the client is usable, which you can detect inside `OnStatusChanged`:

```
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

```


# Set rich presence
Context: Discord developer reference: Set rich presence
[Source](unity-relationships-and-presence-index.md) / [Previous source section](relationships-manager-oauth.md) / [Following source section](rich-presence-result.md)
<a id="source-step-10-set-rich-presence"></a>


---

### Step 10: Set Rich Presence

 Add Rich Presence so Discord can display what the player is doing in your game to friends. Update `ClientReady` with this code:

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

```


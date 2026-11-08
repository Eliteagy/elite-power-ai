# RPC activities write scope
Context: Discord developer reference: RPC activities write scope
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](understanding-rich-presence-data.md) / [Previous source section](understanding-rich-presence-data-updating-presence.md) / [Following source section](set-activity-fields.md)
<a id="source-rpcactivitieswrite-scope"></a>

### rpc.activities.write Scope

 To show custom Rich Presence for a user, authorize the app for that user with the [`rpc.activities.write` scope](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes). A request for that scope in [`authorize()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#authorize) can look like this:

Example requesting rpc.activities.write with authorize()

This example is limited to the `authorize()` call. For setup details such as installing and instantiating the Embedded App SDK, use the [Building an Activity guide](https://docs.discord.com/developers/activities/building-an-activity).

```
// Authorize with Discord Client
const { code } = await discordSdk.commands.authorize({
  client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
  response_type: "code",
  state: "",
  prompt: "none",
  scope: [
    "identify",
    "rpc.activities.write"
  ],
});

```


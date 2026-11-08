# Understanding metadata for interactions
Context: Discord developer reference: Understanding metadata for interactions
[Source](developing-a-user-installable-app-index.md) / [Previous source section](configuring-an-interaction-endpoint-url.md) / [Following source section](using-metadata-for-command-interactions.md)
<a id="source-understanding-metadata-for-interactions"></a> <a id="source-context"></a> <a id="source-authorizing_integration_owners"></a> <a id="source-app_permissions"></a>

### Understanding metadata for interactions

 After the Interactions Endpoint URL is configured, the app's commands should run. Open the app's DM and run `/profile`; the app should return a sample game profile. The command line logs incoming Discord requests, so you can inspect the request body for the command invocation.

Sample interaction payload

The payload below is shortened for readability, but the interaction request body should look similar to this:

```
{
  "app_permissions": "442368",
  "application_id": "234248956100616262",
  "authorizing_integration_owners": { "1": "1090372582781497424" },
  "channel": {
    // Partial channel object corresponding to channel_id
  },
  "channel_id": "1234563982236504123",
  "context": 1,
  "data": { "id": "1234358421659193405", "name": "link", "type": 1 },
  "entitlements": [],
  "id": "1234968734674853908",
  "locale": "en-US",
  "token": "a really long interactions token that your app can use to respond to the interactions",
  "type": 2,
  "user": {
    // Partial user object
  },
  "version": 1
}

```

 The [`data` object](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-data) identifies which command ran. This tutorial focuses on metadata tied to installation and interaction contexts. When building an app that supports multiple interaction contexts, watch these metadata fields:

###### `context`

 `context` identifies the [interaction context](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts) where the command was invoked. In the sample, the command came from the app's DM, so `context` is `1` (`BOT_DM`). `BOT_DM` means only the DM with your bot user. The same command in a DM with another user or in a group DM uses `PRIVATE_CHANNEL` (`2`).

###### `authorizing_integration_owners`

 `authorizing_integration_owners` contains IDs related to the installation context or contexts for the interaction. Object keys represent the relevant installation contexts (`GUILD_INSTALL`/`"0"` and/or `USER_INSTALL`/`"1"`). Values depend on the key, but for `USER_INSTALL`, the value is always the ID of the user who authorized the app. `authorizing_integration_owners` is not the same as the user who triggered the interaction; the triggering user appears in the `user` object. Knowing the authorization owner helps when handling message component interactions for user-installed apps, discussed in [message component interactions](https://docs.discord.com/developers/tutorials/developing-a-user-installable-app#using-metadata-for-message-component-interactions). Technical details are in [Authorizing Integration Owners](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object).

###### `app_permissions`

 `app_permissions` is the bitwise permission set the app has where the interaction was triggered. The value changes between app DMs, servers, and G(DM)s with other users. The sample payload uses `"442368"`. These permissions can guide how the app should [respond to the interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#responding-to-an-interaction). For example, the sample app responds ephemerally for the `/profile` command when it is invoked from a server.


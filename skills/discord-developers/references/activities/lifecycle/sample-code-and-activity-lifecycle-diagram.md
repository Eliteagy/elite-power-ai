# Sample code and activity lifecycle diagram
Context: Discord developer reference: Sample code and activity lifecycle diagram
[Source](activities-index.md) / [Owning endpoint, event, object or procedure conditions](launching-activities.md) / [Previous source section](launching-activities-activity-lifecycle.md) / [Following source section](build-your-first-discord-activity.md)
<a id="source-sample-code-and-activity-lifecycle-diagram"></a>

### Sample Code and Activity Lifecycle Diagram

 The following minimal example initializes the SDK. For more complete applications, see the [Sample Projects](https://docs.discord.com/developers/activities/overview#sample-projects).

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(YOUR_OAUTH2_CLIENT_ID);

async function setup() {
  // Wait for READY payload from the discord client
  await discordSdk.ready();

  // Pop open the OAuth permission modal and request for access to scopes listed in scope array below
  const {code} = await discordSdk.commands.authorize({
    client_id: YOUR_OAUTH2_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: ['identify'],
  });

  // Retrieve an access_token from your application's server
  const response = await fetch('/.proxy/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
    }),
  });
  const {access_token} = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  });
}

```

 This diagram shows the message flow between the application and Discord for the sample above. (Figure: Diagram of how Activities communicate with Discord)


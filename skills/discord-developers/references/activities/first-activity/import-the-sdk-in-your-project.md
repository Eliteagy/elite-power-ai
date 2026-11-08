# Import the SDK in your project
Context: Discord developer reference: Import the SDK in your project
[Source](project-and-authentication-index.md) / [Previous source section](install-the-sdk.md) / [Following source section](running-your-app-in-discord.md)
<a id="source-import-the-sdk-in-your-project"></a>

### Import the SDK in your Project

 After installation, import the SDK into the client code and instantiate it so the app can begin the handshake with the Discord client. Instantiation uses the environment variables created in Step 2. The code also waits for the [`ready` event](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#ready) with async/await so the app can log or run other behavior after the handshake succeeds.

Add SDK initialization to frontend

Code for adding the Embedded App SDK

In `getting-started-activity/client/main.js`, import and instantiate the SDK:

```
// Import the SDK
import { DiscordSDK } from "@discord/embedded-app-sdk";

import "./style.css";
import rocketLogo from '/rocket.png';

// Instantiate the SDK
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk().then(() => {
  console.log("Discord SDK is ready");
});

async function setupDiscordSdk() {
  await discordSdk.ready();
}

document.querySelector('#app').innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>Hello, World!</h1>
  </div>
`;

```

 **Time to leave your browser behind** After adding the SDK, the app will no longer be viewable in a normal web browser. The next step runs the Activity inside Discord.

Step 3 Checkpoint

By the end of Step 3, verify that you have:
- Installed the Embedded App SDK in the project
- Imported the SDK in the project's `client/main.js` file

---


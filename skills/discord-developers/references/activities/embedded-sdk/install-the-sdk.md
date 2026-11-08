# Install the SDK
Context: Discord developer reference: Install the SDK
[Source](methods-commands-and-events-index.md) / [Previous source section](embedded-app-sdk.md) / [Following source section](methods/sdk-methods.md)
<a id="source-install-the-sdk"></a>

### Install the SDK

 You can get the Embedded App SDK from **[npm](https://www.npmjs.com/package/@discord/embedded-app-sdk)** or **[GitHub](https://github.com/discord/embedded-app-sdk)**. Install it from the frontend JavaScript project directory with whichever package manager you use.

```
npm install @discord/embedded-app-sdk

```

 Once installation is complete, import the SDK and create an instance in your project.

```
import { DiscordSDK } from "@discord/embedded-app-sdk";

const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID);

```

---


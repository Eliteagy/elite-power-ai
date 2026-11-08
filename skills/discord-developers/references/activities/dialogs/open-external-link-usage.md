# Open external link usage
Context: Discord developer reference: Open external link usage
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](open-external-link.md) / [Following source section](open-external-link-user-experience.md)
<a id="source-usage"></a>

#### Usage

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();
// Once the sdk has established the connection with the discord client, external
// links can be launched
discordSdk.commands.openExternalLink({
  url: 'https://google.com',
});

```


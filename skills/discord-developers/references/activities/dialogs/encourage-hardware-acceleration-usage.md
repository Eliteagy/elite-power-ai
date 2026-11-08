# Encourage hardware acceleration usage
Context: Discord developer reference: Encourage hardware acceleration usage
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](encourage-hardware-acceleration.md) / [Previous source section](encourage-hardware-acceleration-best-practices.md) / [Following source section](encourage-hardware-acceleration-user-experience.md)
<a id="source-usage-3"></a>

#### Usage

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();
const {enabled} = await discordSdk.commands.encourageHardwareAcceleration();
console.log(`Hardware Acceleration is ${enabled === true ? 'enabled' : 'disabled'}`);

```


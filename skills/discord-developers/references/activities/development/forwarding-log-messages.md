# Forwarding log messages
Context: Discord developer reference: Forwarding log messages
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally-logging.md) / [Previous source section](logging-disabling-logging.md) / [Following source section](supported-platforms-web-i-os-android.md)
<a id="source-forwarding-log-messages"></a>

#### Forwarding Log Messages

 Use the SDK command `captureLog` to send selected log messages, as in the following example.

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();
discordSdk.commands.captureLog({
  level: 'log',
  message: 'This is my log message!',
});

```


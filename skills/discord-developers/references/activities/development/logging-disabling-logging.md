# Logging disabling logging
Context: Discord developer reference: Logging disabling logging
[Source](hosting-mobile-and-proxy-index.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally.md) / [Owning endpoint, event, object or procedure conditions](run-your-application-locally-logging.md) / [Previous source section](sharing-application-logs-from-mobile.md) / [Following source section](forwarding-log-messages.md)
<a id="source-disabling-logging"></a>

#### Disabling Logging

 To stop logs from being forwarded to the browser, disable logging with the optional configuration object.

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId, {
  disableConsoleLogOverride: true,
});

```


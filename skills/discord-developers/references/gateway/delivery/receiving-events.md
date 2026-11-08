# Receiving events
Context: Discord developer reference: Receiving events
[Source](event-delivery-index.md) / [Previous source section](overview.md) / [Following source section](using-gateway.md)
<a id="source-receiving-events"></a>

### Receiving Events

 Different categories of events are available through different delivery mechanisms:
- **[Gateway events](https://docs.discord.com/developers/events/overview#using-gateway)** arrive over a WebSocket session between Discord and your app, and they are the main event transport. **Most events require Gateway connections.**
- **[Webhook events](https://docs.discord.com/developers/events/overview#using-webhooks)** are delivered by HTTP requests to the app's Webhook Event URL.
- **[SDK events](https://docs.discord.com/developers/events/overview#using-the-embedded-app-sdk)** are emitted to an app that is built with the Embedded App SDK.
 The following sections describe each event-receiving approach in more detail.


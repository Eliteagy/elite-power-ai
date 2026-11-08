# Using webhooks
Context: Discord developer reference: Using webhooks
[Source](event-delivery-index.md) / [Previous source section](using-gateway.md) / [Following source section](using-the-embedded-app-sdk.md)
<a id="source-using-webhooks"></a>

### Using Webhooks

 Webhook events provide HTTP delivery for a limited set of events. Although many event types cannot be received this way, some, such as [Application Authorized](https://docs.discord.com/developers/events/webhook-events#application-authorized), which fires when an app is installed for a user or server, are not exposed through transports such as Gateway. The [Webhook Events documentation](https://docs.discord.com/developers/events/webhook-events) explains subscriptions and handling, and its [event types](https://docs.discord.com/developers/events/webhook-events#event-types) section lists the supported webhook events.


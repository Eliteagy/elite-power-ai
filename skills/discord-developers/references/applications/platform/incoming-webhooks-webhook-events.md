# Incoming webhooks webhook events
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](incoming-webhooks.md) / [Previous source section](incoming-webhooks.md) / [Following source section](webhook-resource-reference.md)

<a id="source-webhook-events"></a>

### Webhook Events

 Webhook events send data the other way: Discord POSTs to a public server URL when selected app events occur. Instead of polling, the app receives pushed notifications. Subscribe to event types in the Developer Portal, and Discord sends signed HTTP POST requests to the endpoint. The endpoint must validate Discord request signatures and acknowledge events quickly. Subscribable events include:
- A user authorizes or de-authorizes the application
- Entitlement created when a user purchased something from the app
- Quest enrollment and completion events
 See [Webhook Events](https://docs.discord.com/developers/events/webhook-events) for the complete event list and setup instructions.

<a id="source-webhook-events-1"></a>

### Webhook Events

Subscribable event types and endpoint setup for receiving them.

# Receiving an interaction
Context: Discord developer reference: Receiving an interaction
[Source](interaction-objects-and-responses-index.md) / [Previous source section](message-interaction-object.md) / [Following source section](interaction-metadata.md)
<a id="source-receiving-an-interaction"></a>

### Receiving an Interaction

 When someone interacts with your app, the app receives an **[Interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object)**. There are two possible delivery methods:
- Through the [Interaction Create](https://docs.discord.com/developers/events/gateway-events#interaction-create) gateway event
- Via outgoing webhook
 These delivery methods are **mutually exclusive**; an app can receive Interactions by only one of them. Connected clients can handle the `INTERACTION_CREATE` [Gateway Event](https://docs.discord.com/developers/events/gateway-events#interaction-create), while the webhook path described below works without a connected client. To receive interactions as HTTP outgoing webhooks, configure an Interactions Endpoint URL for the app. See [Preparing for Interactions](https://docs.discord.com/developers/interactions/overview#preparing-for-interactions) in Interactions Overview for setup details.


# Preparing for interactions
Context: Discord developer reference: Preparing for interactions
[Source](interaction-types-index.md) / [Previous source section](modals.md) / [Following source section](configuring-an-interactions-endpoint-url.md)
<a id="source-preparing-for-interactions"></a>

### Preparing for Interactions

 When someone uses the app, interactions can be delivered to the app in one of two mutually exclusive modes:
- WebSocket-based Gateway connection
- HTTP via outgoing webhooks
 By default, interactions arrive over a Gateway connection. To use HTTP-based delivery instead, add an **Interactions Endpoint URL** in the app settings. Implementation details for handling interactions are in [Receiving and Responding](https://docs.discord.com/developers/interactions/receiving-and-responding).


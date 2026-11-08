# Responding to an interaction
Context: Discord developer reference: Responding to an interaction
[Source](interaction-objects-and-responses-index.md) / [Previous source section](interaction-metadata.md) / [Following source section](interaction-response-structure.md)
<a id="source-responding-to-an-interaction"></a>

### Responding to an Interaction

 Receiving and responding to Interactions both use webhooks internally, so responding works much like sending a webhook request. Interaction responses follow the same header rules as ordinary HTTP API requests; see [here](https://docs.discord.com/developers/reference#http-api). You can respond to an interaction in several ways:


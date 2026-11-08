# Using gateway
Context: Discord developer reference: Using gateway
[Source](event-delivery-index.md) / [Previous source section](receiving-events.md) / [Following source section](using-webhooks.md)
<a id="source-using-gateway"></a>

### Using Gateway

 Gateway events are the central mechanism for apps to receive and publish event traffic. Resource changes in Discord, including channel, guild, role, and message updates, are generally exposed only through the [Gateway](https://docs.discord.com/developers/events/gateway). Discord sends Gateway events across a WebSocket-backed [Gateway connection](https://docs.discord.com/developers/events/gateway#connections) maintained by your app. To consume these events, the app needs to establish and keep a persistent Gateway connection; connection behavior is documented in [Gateway documentation](https://docs.discord.com/developers/events/gateway#connections). A [developer library](https://docs.discord.com/developers/developer-tools/community-resources#libraries) can simplify connection setup, lifecycle management, and common concerns such as [rate limits](https://docs.discord.com/developers/events/gateway#rate-limiting). For receiving behavior, see the [Gateway documentation](https://docs.discord.com/developers/events/gateway#receiving-events); for the complete event catalog, see [Gateway Events documentation](https://docs.discord.com/developers/events/gateway-events).


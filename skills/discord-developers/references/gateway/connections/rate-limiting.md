# Rate limiting
Context: Discord developer reference: Rate limiting
[Source](intents-members-and-sharding-index.md) / [Previous source section](message-content-intent.md) / [Following source section](encoding-and-compression.md)
<a id="source-rate-limiting"></a>

### Rate Limiting

 This section covers Gateway rate limits, not [HTTP API rate limits](https://docs.discord.com/developers/topics/rate-limits). Apps may send 120 [gateway events](https://docs.discord.com/developers/events/gateway-events) per [connection](https://docs.discord.com/developers/events/gateway#connections) every 60 seconds, which averages 2 commands per second. Exceeding the limit disconnects the app from the Gateway immediately. As with other rate limits, repeated violations can revoke API access. Apps also have a cap on [concurrent](https://docs.discord.com/developers/events/gateway#session-start-limit-object) [Identify](https://docs.discord.com/developers/events/gateway#identifying) requests per 5 seconds. If that limit is hit, the Gateway returns an [Invalid Session (opcode `9`)](https://docs.discord.com/developers/events/gateway-events#invalid-session).


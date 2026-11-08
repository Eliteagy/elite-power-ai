# Application commands HTTP interactions
Context: Discord developer reference: Application commands HTTP interactions
[Source](components-discovery-and-platform-apis-index.md) / [Owning endpoint, event, object or procedure conditions](application-commands.md) / [Previous source section](application-commands-gateway-interactions.md) / [Following source section](application-commands-interactions-overview.md)
<a id="source-http-interactions"></a>

### HTTP Interactions

 Alternatively, set an **Interactions Endpoint URL** in the app settings to receive interactions as HTTP POST requests directly on your server. Discord delivers the requests, and the app must respond within a few seconds. This model fits apps that only answer commands and UI components, requires no persistent connection, and scales with ordinary web infrastructure. The endpoint must validate Discord request signatures and handle the initial `PING` handshake. See [Interactions Overview](https://docs.discord.com/developers/interactions/overview#preparing-for-interactions) for setup details.


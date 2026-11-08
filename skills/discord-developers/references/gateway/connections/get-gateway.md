# Get gateway
Context: Discord developer reference: Get gateway
[Source](gateway-endpoints-and-session-limits-index.md) / [Previous source section](sharding-for-large-bots.md) / [Following source section](get-gateway-bot.md)
<a id="source-get-gateway"></a> <a id="source-example-response"></a>

### Get Gateway

  Authentication is not required for this endpoint. It returns an object containing a valid WSS URL that the app can use when [Connecting](https://docs.discord.com/developers/events/gateway#connecting) to the Gateway. Apps should keep the value cached and request another URL only when the cached URL cannot establish a connection correctly.

###### Example Response

```
{
  "url": "wss://gateway.discord.gg/"
}

```


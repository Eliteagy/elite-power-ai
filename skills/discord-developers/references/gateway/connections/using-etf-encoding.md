# Using etf encoding
Context: Discord developer reference: Using etf encoding
[Source](intents-members-and-sharding-index.md) / [Previous source section](using-json-encoding-payload-compression.md) / [Following source section](transport-compression.md)
<a id="source-using-etf-encoding"></a>

### Using ETF Encoding

 ETF (External Term Format) encoding has several specific behaviors:
- Snowflake IDs are sent as 64-bit integers or strings.
- The app cannot send compressed messages to the server.
- Outbound payloads must use string keys. Atom keys cause a [`4002`](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes) decode error.
 See [erlpack](https://github.com/discord/erlpack) for an ETF implementation example.


# Handling rate limits
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](local-development-cache-busting.md) / [Following source section](static-ip-addresses.md)

<a id="source-handling-rate-limits"></a>

### Handling Rate Limits

Keep your Activity within rate limits.

<a id="source-handling-rate-limits"></a>

### Handling Rate Limits

 Ensure your application's client and server requests can honor Discord API rate limits [as described here](https://docs.discord.com/developers/topics/rate-limits). [This implementation in the Activity Starter project](https://github.com/discord/embedded-app-sdk-examples/blob/main/discord-activity-starter/packages/server/src/utils.ts) shows one way to handle the `retry_after` header after a 429 response.

---

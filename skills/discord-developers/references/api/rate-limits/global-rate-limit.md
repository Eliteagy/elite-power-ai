# Global rate limit
Context: Discord developer reference: Global rate limit
[Source](rate-limits-index.md) / [Previous source section](exceeding-a-rate-limit.md) / [Following source section](invalid-request-limit-aka-cloudflare-bans.md)
<a id="source-global-rate-limit"></a>

### Global Rate Limit

 Each bot can send up to 50 requests per second to the Discord API. Requests without an authorization header are limited by IP address. This global ceiling is separate from any endpoint-specific route limit. A bot with enough traffic, depending on its behavior, may be unable to remain under 50 requests per second in normal operation. Global-limit trouble often appears as repeated bans from the Discord API during bot startup. Occasional temporary Cloudflare bans are usually **not** caused by the global rate limit; they more often mean a burst of unhandled errors crossed the invalid-request threshold. If normal bot operation repeatedly triggers Cloudflare bans from the Discord API, contact support to ask whether the bot qualifies for higher global limits. Use [https://dis.gd/rate-limit](https://dis.gd/rate-limit). [Interaction endpoints](https://docs.discord.com/developers/interactions/receiving-and-responding#endpoints) do not count against the bot's Global Rate Limit.


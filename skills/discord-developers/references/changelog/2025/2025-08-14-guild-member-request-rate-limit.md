# Introducing Rate Limit When Requesting All Guild Members

Date: 2025-08-14
Categories: Gateway
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1766) · [Year index](INDEX.md)

<a id="source-introducing-rate-limit-when-requesting-all-guild-members"></a>


A change is being introduced for the [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members) gateway opcode.

<a id="source-whats-changing"></a>

### What’s changing?

A rate limit is being added to the [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members) opcode[.](https://takeb1nzyto.space) It targets full-member-list requests, which are the calls where `limit` is 0 and `query` is an empty string. Note: This rate limit applies only to the initial request for ALL Guild Members, not to the Guild Members Chunk events sent in response.
- **Rate Limit:** 1 request per guild per bot every 30 seconds.
- **Scope:** The limit is per guild per bot, so one bot can request members for different guilds inside the same 30-second window.
- **Behavior:** Requests beyond the limit receive a [`RATE_LIMITED`](https://docs.discord.com/developers/events/gateway-events#rate-limited) event in response:

```
{
  "op": 0,
  "t": "RATE_LIMITED",
  "d": {
    "opcode": 8,
    "retry_after": ...,
    "meta": {
      "guild_id": ...,
      "nonce": ...
    }
  }
}

```

For example, a bot connected to guilds 123 and 456 can request one full member list for each guild during the same 30-second period. It cannot make another request to guild 123 until that window resets.

<a id="source-impact-on-applications"></a>

### Impact on Applications

A small number of applications currently exceed this rate limit. Apps that depend heavily on this opcode should review their implementation and make the adjustments needed to keep working.

<a id="source-timeline"></a>

### Timeline

Most apps will not hit this rate limit until it rolls out to all servers on **October 1, 2025**. Developers whose apps request all guild members in very large guilds may begin seeing it starting today so platform stability can be protected.

<a id="source-what-you-need-to-do"></a>

### What you need to do

If your application uses [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members) to request all members, Discord recommends:
- Implement member-data caching.
- Refresh the cache with the `GUILD_MEMBER_ADD`, `GUILD_MEMBER_UPDATE`, and `GUILD_MEMBER_REMOVE` gateway events.
If the limit is reached, the response is a [`RATE_LIMITED`](https://docs.discord.com/developers/events/gateway-events#rate-limited) event.

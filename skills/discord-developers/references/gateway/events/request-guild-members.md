# Request guild members
Context: Discord developer reference: Request guild members
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](send-events.md) / [Previous source section](send-events-heartbeat.md) / [Following source section](request-soundboard-sounds.md)
<a id="source-request-guild-members"></a> <a id="source-request-guild-members-structure"></a> <a id="source-example-request-guild-members"></a>

#### Request Guild Members

 Requests every member for one guild or for multiple guilds. During initial connection, if `GUILD_PRESENCES` [Gateway Intent](https://docs.discord.com/developers/events/gateway#gateway-intents) is absent, or if the guild has more than 75k members, Discord sends only voice members plus the connecting user's member object. Otherwise, for guilds above the `large_threshold` value set in [Gateway Identify](https://docs.discord.com/developers/events/gateway-events#identify), Discord limits the initial member set to online members, role-bearing members, nicknamed members, and voice participants; guilds below `large_threshold` send all members. Clients that need additional members must request them with this operation. Discord replies with [Guild Members Chunk](https://docs.discord.com/developers/events/gateway-events#guild-members-chunk) events containing up to 1000 members per chunk until every requested matching member has been sent. Privacy and infrastructure requirements impose these limits:
- `GUILD_PRESENCES` intent is required for `presences = true`; without it, the value is always false.
- `GUILD_MEMBERS` intent is required to request the full member list—`(query=‘’, limit=0<=n)`.
- Each request is limited to 1 `guild_id`.
- A prefix request using the `query` parameter can return at most 100 members.
- Requests using `user_ids` remain capped at 100 returned members.
 A new rate limit is being added to the Request Guild Members opcode. See [Introducing Rate Limit When Requesting All Guild Members](https://docs.discord.com/developers/change-log#introducing-rate-limit-when-requesting-all-guild-members) for timing and details.

###### Request Guild Members Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| guild_id | snowflake | ID of the guild whose members are being requested | true |
| query? | string | username prefix to match, or an empty string when returning all members | one of query or user_ids |
| limit | integer | maximum count of members to send for the `query`; use a limit of `0` with an empty string `query` to request every member | true when specifying query |
| presences? | boolean | sets whether presences should be included for matched members | false |
| user_ids? | snowflake or array of snowflakes | identifies the specific users to fetch | one of query or user_ids |
| nonce? | string | nonce used to match the Guild Members Chunk response | false |

 A nonce may be no larger than 32 bytes. If an invalid nonce is sent, Discord ignores it and the response member_chunk(s) omit the nonce.

###### Example Request Guild Members

```
{
  "op": 8,
  "d": {
    "guild_id": "41771983444115456",
    "query": "",
    "limit": 0
  }
}

```


# Receive events ready
Context: Discord developer reference: Receive events ready
[Source](identify-ready-and-guild-events-index.md) / [Owning endpoint, event, object or procedure conditions](receive-events.md) / [Previous source section](receive-events-hello.md) / [Following source section](receive-events-resumed.md)
<a id="source-ready"></a> <a id="source-ready-event-fields"></a>

#### Ready

 The ready event is dispatched after a client completes the initial gateway handshake for a new session. It can be the gateway's largest and most complex event because it provides the state a client needs before interacting with the rest of the platform. `guilds` lists the guilds where the bot is a member. They are unavailable at connection time, and the bot receives [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) events as each guild becomes available.

###### Ready Event Fields

| Field | Type | Description |
| --- | --- | --- |
| v | integer | API version |
| user | user object | User information, including email |
| guilds | array of Unavailable Guild objects | Guilds the user is in |
| session_id | string | Used for resuming connections |
| resume_gateway_url | string | Gateway URL for resuming connections |
| shard? | array of two integers (shard_id, num_shards) | Shard details for this session, when supplied during identify |
| application | partial application object | Contains `id` and `flags` |


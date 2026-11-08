# Sharding
Context: Discord developer reference: Sharding
[Source](intents-members-and-sharding-index.md) / [Continued source contract](sharding-max-concurrency.md) / [Previous source section](guild-availability.md)
<a id="source-sharding"></a> <a id="source-sharding-formula"></a> <a id="source-max-concurrency"></a>

### Sharding

 As apps grow into more guilds, developers may need to spread app operations across multiple processes. The Gateway supports user-controlled guild sharding, letting apps divide events across multiple Gateway connections. The app fully controls guild sharding, and separate connections do not need shared state to operate. Any app can enable sharding, but smaller apps usually do not need it. Each shard supports a maximum of 2500 guilds, and apps in 2500+ guilds *must* shard. To enable sharding on a connection, send the `shard` array in the [Identify](https://docs.discord.com/developers/events/gateway-events#identify) payload. The first array item is the zero-based integer for the current shard, and the second item is the total shard count. The [Get Gateway Bot](https://docs.discord.com/developers/events/gateway#get-gateway-bot) endpoint returns Discord's recommended shard count in the `shards` field. Use this formula to determine which shard receives each event:

###### Sharding Formula

```
shard_id = (guild_id >> 22) % num_shards

```

 For example, splitting the connection across three shards uses these `shard` values: `[0, 3]`, `[1, 3]`, and `[2, 3]`. Gateway events without a `guild_id` go only to the first shard (`shard_id: 0`), including Direct Message (DM), subscription, and entitlement events. `num_shards` does not describe or limit the total possible sessions; it is only for *routing* traffic. Sessions therefore do not need to be identified with an even distribution while sharding. You can open multiple sessions with the same `[shard_id, num_shards]`, or sessions using different `num_shards` values. That flexibility lets operators rebalance load or perform zero-downtime updates by preparing another session deployment with a different `num_shards` value before moving traffic to it.

###### Max Concurrency

 When multiple shards are used, you can start them concurrently according to the [`max_concurrency`](https://docs.discord.com/developers/events/gateway#session-start-limit-object) value returned at session start. The shards that may start together are assigned by a key for each shard. Compute the rate limit key for a shard with

```
rate_limit_key = shard_id % max_concurrency

```

 This places shards into buckets sized by `max_concurrency`. On bot startup, you can start up to `max_concurrency` shards at once, and the buckets must be started **in order**. For example, with 16 shards and `max_concurrency` set to 16:

```
shard_id: 0, rate limit key (0 % 16): 0
shard_id: 1, rate limit key (1 % 16): 1
shard_id: 2, rate limit key (2 % 16): 2
shard_id: 3, rate limit key (3 % 16): 3
shard_id: 4, rate limit key (4 % 16): 4
shard_id: 5, rate limit key (5 % 16): 5
shard_id: 6, rate limit key (6 % 16): 6
shard_id: 7, rate limit key (7 % 16): 7
shard_id: 8, rate limit key (8 % 16): 8
shard_id: 9, rate limit key (9 % 16): 9
shard_id: 10, rate limit key (10 % 16): 10
shard_id: 11, rate limit key (11 % 16): 11
shard_id: 12, rate limit key (12 % 16): 12
shard_id: 13, rate limit key (13 % 16): 13
shard_id: 14, rate limit key (14 % 16): 14
shard_id: 15, rate limit key (15 % 16): 15

```

 All 16 shards can start simultaneously because each `rate_limit_key` fills the bucket of 16 shards. Now consider 32 shards:

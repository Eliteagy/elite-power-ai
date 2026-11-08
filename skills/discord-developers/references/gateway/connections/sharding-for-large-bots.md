# Sharding for large bots
Context: Discord developer reference: Sharding for large bots
[Source](gateway-endpoints-and-session-limits-index.md) / [Previous source section](sharding-max-concurrency.md) / [Following source section](get-gateway.md)
<a id="source-sharding-for-large-bots"></a>

### Sharding for Large Bots

 Bots present in more than 150,000 guilds have extra sharding requirements. As a bot approaches the large bot sharding threshold, Discord moves it to large bot sharding. The bot owner(s) receive a system DM and an email after the migration is complete, including the assigned shard number. The shard count you run must be a multiple of the shard number Discord provides during that contact. Starting the bot with a shard count that is not valid causes the Gateway connection to close with `4010` Invalid Shard. The [Get Gateway Bot endpoint](https://docs.discord.com/developers/events/gateway#get-gateway-bot) always reports the correct shard count, so implementations that already use that endpoint to choose shard count should not need changes. For these bots, the daily session start limit also rises from 1000 to `max(2000, (guild_count / 1000) * 5)`. Discord also increases `max_concurrency`, which is the number of [shards you can concurrently start](https://docs.discord.com/developers/events/gateway#session-start-limit-object).


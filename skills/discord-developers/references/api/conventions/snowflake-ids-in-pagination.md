# Snowflake ids in pagination
Context: Discord developer reference: Snowflake ids in pagination
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](snowflakes.md) / [Following source section](id-serialization.md)
<a id="source-convert-snowflake-to-datetime"></a> <a id="source-snowflake-ids-in-pagination"></a>

### Convert Snowflake to DateTime

### Snowflake IDs in Pagination

 Many API routes use snowflake IDs for pagination. The common pagination model accepts `before` and `after` IDs together with `limit` to fetch the desired page. Always check the specific endpoint for exact behavior. Since a snowflake is numeric and includes a timestamp, you can generate a snowflake for a point in time when paginating from the beginning of time, from Discord Epoch where `0` also works, or around a particular timestamp. **Generating a snowflake ID from a Timestamp Example**

```
(timestamp_ms - DISCORD_EPOCH) << 22

```


# Snowflakes
Context: Discord developer reference: Snowflakes
[Source](http-versions-authentication-and-formatting-index.md) / [Previous source section](encryption.md) / [Following source section](snowflake-ids-in-pagination.md)
<a id="source-snowflakes"></a>

### Snowflakes

 Discord uses Twitter's [snowflake](https://github.com/twitter-archive/snowflake/tree/snowflake-2010) format for unique IDs. These IDs are unique throughout Discord except for certain special cases where child objects use the same ID as the parent. Snowflakes can be up to 64 bits, such as a uint64, so the HTTP API returns them as strings to avoid integer overflow in some languages. See [Gateway ETF/JSON](https://docs.discord.com/developers/events/gateway#encoding-and-compression) for Gateway encoding details. **Snowflake ID Broken Down in Binary**

```
111111111111111111111111111111111111111111 11111 11111 111111111111
64                                         22    17    12          0

```

 **Snowflake ID Format Structure (Left to Right)**
| Field | Bits | Number of bits | Description | Retrieval |
| --- | --- | --- | --- | --- |
| Timestamp | 63 to 22 | 42 bits | Elapsed milliseconds from Discord Epoch, the first second of 2015 or 1420070400000. | `(snowflake >> 22) + 1420070400000` |
| Internal worker ID | 21 to 17 | 5 bits |  | `(snowflake & 0x3E0000) >> 17` |
| Internal process ID | 16 to 12 | 5 bits |  | `(snowflake & 0x1F000) >> 12` |
| Increment | 11 to 0 | 12 bits | Incremented for each ID produced by that process | `snowflake & 0xFFF` |


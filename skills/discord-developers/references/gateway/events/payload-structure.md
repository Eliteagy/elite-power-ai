# Payload structure
Context: Discord developer reference: Payload structure
[Source](identify-ready-and-guild-events-index.md) / [Previous source section](event-names.md) / [Following source section](send-events.md)
<a id="source-payload-structure"></a> <a id="source-example-gateway-event-payload"></a>

### Payload Structure

 Gateway event payloads share one outer format, while the event-specific data in `d` changes by event type.
| Field | Type | Description |
| --- | --- | --- |
| op | integer | Gateway opcode that identifies the payload type |
| d | ?mixed (any JSON value) | Event data |
| s | ?integer * | Event sequence number used when resuming sessions and sending heartbeats |
| t | ?string * | Event name |

 * `s` and `t` are `null` unless `op` is `0` ([Gateway Dispatch opcode](https://docs.discord.com/developers/topics/opcodes-and-status-codes#gateway-gateway-opcodes)).

###### Example Gateway Event Payload

```
{
  "op": 0,
  "d": {},
  "s": 42,
  "t": "GATEWAY_EVENT_NAME"
}

```


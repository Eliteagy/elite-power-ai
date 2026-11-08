# Event body object
Context: Discord developer reference: Event body object
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](payload-structure.md) / [Previous source section](payload-structure-webhook-types.md) / [Following source section](event-types.md)
<a id="source-event-body-object"></a>

#### Event Body Object

 The event body carries top-level event information such as type and trigger time. The inner `data` object holds fields specific to the [event type](https://docs.discord.com/developers/events/webhook-events#event-types).
| Field | Type | Description |
| --- | --- | --- |
| type | string | Event type |
| timestamp | string | Timestamp for when the event occurred, in ISO8601 format |
| data? | object | Event data. Its structure is determined by the event type |


# Payload structure
Context: Discord developer reference: Payload structure
[Source](webhook-events-index.md) / [Previous source section](webhook-event-payloads.md) / [Following source section](payload-structure-webhook-types.md)
<a id="source-payload-structure"></a>

### Payload Structure

 Outer webhook payload structure
| Field | Type | Description |
| --- | --- | --- |
| version | integer | Webhook event version scheme. Currently always `1` |
| application_id | snowflake | ID of your app |
| type | webhook type | Webhook type: `0` for PING or `1` for webhook events |
| event? | event body object | Event data payload |


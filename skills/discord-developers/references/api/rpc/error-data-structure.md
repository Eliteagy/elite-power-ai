# Error data structure
Context: Discord developer reference: Error data structure
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](ready-dispatch-data-structure.md) / [Following source section](guild-status-argument-structure.md)
<a id="source-error"></a> <a id="source-error-data-structure"></a> <a id="source-example-error-payload"></a>

#### ERROR

###### Error Data Structure

| Field | Type | Description |
| --- | --- | --- |
| code | integer | RPC Error Code |
| message | string | Error description |

###### Example Error Payload

```
{
  "cmd": "AUTHORIZE",
  "data": {
    "code": 4007,
    "message": "No client id provided"
  },
  "evt": "ERROR",
  "nonce": "5102b6f0-c769-4f37-8cca-25fb0ab22628"
}

```


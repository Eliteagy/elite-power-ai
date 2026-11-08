# Commands and events entitlement delete
Context: Discord developer reference: Commands and events entitlement delete
[Source](relationship-and-entitlement-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-entitlement-create.md)
<a id="source-entitlement_delete"></a> <a id="source-entitlement-delete-dispatch-data-structure"></a> <a id="source-example-entitlement-delete-dispatch-payload"></a>

#### ENTITLEMENT_DELETE

 Takes no arguments. Sent when this application loses an entitlement. The entitlement object in the payload contains the entitlement values from deletion time.

###### Entitlement Delete Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| entitlement | entitlement object | the entitlement that was deleted |

###### Example Entitlement Delete Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "data": {
    "entitlement": {
      "id": "1019653849998299136",
      "sku_id": "1019475255913222144",
      "application_id": "192741864418312192",
      "user_id": "53908232506183680",
      "type": 8,
      "deleted": true,
      "starts_at": "2022-09-14T17:00:18.704163+00:00",
      "ends_at": "2022-10-14T17:00:18.704163+00:00"
    }
  },
  "evt": "ENTITLEMENT_DELETE"
}

```

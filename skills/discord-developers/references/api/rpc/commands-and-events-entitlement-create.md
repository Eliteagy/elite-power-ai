# Commands and events entitlement create
Context: Discord developer reference: Commands and events entitlement create
[Source](relationship-and-entitlement-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](relationship-update-relationship-types.md) / [Following source section](commands-and-events-entitlement-delete.md)
<a id="source-entitlement_create"></a> <a id="source-entitlement-create-dispatch-data-structure"></a> <a id="source-entitlement-object"></a> <a id="source-entitlement-types"></a> <a id="source-example-entitlement-create-dispatch-payload"></a>

#### ENTITLEMENT_CREATE

 Takes no arguments. Sent when the user receives a new entitlement for this application.

###### Entitlement Create Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| entitlement | entitlement object | the entitlement that was created |

###### Entitlement Object

| Field | Type | Description |
| --- | --- | --- |
| id | string | entitlement id |
| sku_id | string | SKU id associated with this entitlement |
| application_id | string | id of the application |
| user_id | string | id for the user who owns the entitlement |
| type | integer | entitlement type |
| deleted | boolean | whether the entitlement is marked deleted |
| starts_at? | ISO8601 | start date of the entitlement |
| ends_at? | ISO8601 | end date of the entitlement |
| guild_id? | string | id for the guild covered by the entitlement |
| consumed? | boolean | whether a consumable entitlement has been consumed |

###### Entitlement Types

| Type | Value | Description |
| --- | --- | --- |
| PURCHASE | 1 | purchased by a user |
| PREMIUM_SUBSCRIPTION | 2 | a Nitro subscription |
| DEVELOPER_GIFT | 3 | gifted by a developer |
| TEST_MODE_PURCHASE | 4 | purchased in test mode |
| FREE_PURCHASE | 5 | granted for free |
| USER_GIFT | 6 | gifted by another user |
| PREMIUM_PURCHASE | 7 | purchased as a premium feature |
| APPLICATION_SUBSCRIPTION | 8 | an app subscription |

###### Example Entitlement Create Dispatch Payload

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
      "deleted": false,
      "starts_at": "2022-09-14T17:00:18.704163+00:00",
      "ends_at": "2022-10-14T17:00:18.704163+00:00"
    }
  },
  "evt": "ENTITLEMENT_CREATE"
}

```


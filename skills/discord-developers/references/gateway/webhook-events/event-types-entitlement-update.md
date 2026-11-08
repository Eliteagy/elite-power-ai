# Event types entitlement update
Context: Discord developer reference: Event types entitlement update
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](event-types-entitlement-create.md) / [Following source section](event-types-entitlement-delete.md)
<a id="source-entitlement-update"></a> <a id="source-entitlement-update-structure"></a> <a id="source-entitlement-update-example"></a>

#### Entitlement Update

 `ENTITLEMENT_UPDATE` fires when an [entitlement](https://docs.discord.com/developers/resources/entitlement) changes. See the [Monetization documentation](https://docs.discord.com/developers/monetization/overview) for details.

###### Entitlement Update Structure

 The inner payload is an [entitlement](https://docs.discord.com/developers/resources/entitlement#entitlement-object) object.

###### Entitlement Update Example

```
{
  "version": 1,
  "application_id": "1234560123453231555",
  "type": 1,
  "event": {
    "type": "ENTITLEMENT_UPDATE",
    "timestamp": "2024-10-18T18:41:21.109604",
    "data": {
      "application_id": "1234560123453231555",
      "consumed": false,
      "deleted": false,
      "gift_code_flags": 0,
      "id": "1234505980407808808",
      "promotion_id": null,
      "sku_id": "123489045643835123",
      "type": 4,
      "user_id": "111178765189277770"
    }
  }
}

```


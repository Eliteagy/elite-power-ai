# Event types entitlement create
Context: Discord developer reference: Event types entitlement create
[Source](webhook-events-index.md) / [Owning endpoint, event, object or procedure conditions](event-types.md) / [Previous source section](event-types-application-deauthorized.md) / [Following source section](event-types-entitlement-update.md)
<a id="source-entitlement-create"></a> <a id="source-entitlement-create-structure"></a> <a id="source-entitlement-create-example"></a>

#### Entitlement Create

 `ENTITLEMENT_CREATE` fires when an [entitlement](https://docs.discord.com/developers/resources/entitlement) is created because a user purchased or otherwise received one of the app's SKUs. See the [Monetization documentation](https://docs.discord.com/developers/monetization/overview) for details.

###### Entitlement Create Structure

 The inner payload is an [entitlement](https://docs.discord.com/developers/resources/entitlement#entitlement-object) object.

###### Entitlement Create Example

```
{
  "version": 1,
  "application_id": "1234560123453231555",
  "type": 1,
  "event": {
    "type": "ENTITLEMENT_CREATE",
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


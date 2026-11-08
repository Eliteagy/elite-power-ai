# SKU object SKU structure
Context: Discord developer reference: SKU object SKU structure
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](sku-object.md) / [Following source section](sku-object-list-skus.md)
<a id="source-sku-object-1"></a> <a id="source-sku-structure"></a> <a id="source-sku-example"></a> <a id="source-sku-types"></a> <a id="source-sku-flags"></a>

### SKU Object

###### SKU Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of SKU |
| type | integer | Type of SKU |
| application_id | snowflake | ID of the parent application |
| name | string | User-facing name for the premium offering |
| slug | string | System-created URL slug derived from the SKU's name |
| flags | integer | SKU flags represented as a combined bitfield |

###### SKU Example

```
{
  "id": "1088510058284990888",
  "type": 5,
  "dependent_sku_id": null,
  "application_id": "788708323867885999",
  "manifest_labels": null,
  "access_type": 1,
  "name": "Test Premium",
  "features": [],
  "release_date": null,
  "premium": false,
  "slug": "test-premium",
  "flags": 128,
  "show_age_gate": false
}

```

###### SKU Types

 Subscription SKUs use either `SUBSCRIPTION` with `type: 5` or `SUBSCRIPTION_GROUP` with `type:6`. Current integrations should use the SKU with `type: 5`. Discord automatically creates a `SUBSCRIPTION_GROUP` for each `SUBSCRIPTION` SKU, and those group SKUs are not currently used.
| Type | Value | Description |
| --- | --- | --- |
| DURABLE | 2 | Durable one-time purchase |
| CONSUMABLE | 3 | Consumable one-time purchase |
| SUBSCRIPTION | 5 | Represents a recurring subscription |
| SUBSCRIPTION_GROUP | 6 | System-created group for every SUBSCRIPTION SKU |

###### SKU Flags

 Subscription offerings support two access models:
- **Guild Subscriptions**: A user buys the subscription for one server, granting premium benefits to everyone in that server.
- **User Subscriptions**: A user buys the subscription for their own account, granting premium benefits to that user across every server.
 Use the `flags` field with a bitwise `&` operator to distinguish user subscriptions from server subscriptions.
| Type | Value | Description |
| --- | --- | --- |
| AVAILABLE | `1 << 2` | SKU is available for purchase |
| GUILD_SUBSCRIPTION | `1 << 7` | Recurring SKU bought by a user and applied to one server. Grants access to all users in that server. |
| USER_SUBSCRIPTION | `1 << 8` | Recurring SKU bought by a user for that user. Grants access to the purchaser in every server. |


# Entitlement object entitlement structure
Context: Discord developer reference: Entitlement object entitlement structure
[Source](../../resources/emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](entitlement-object.md) / [Following source section](entitlement-object-list-entitlements.md)
<a id="source-entitlement-object-1"></a> <a id="source-entitlement-structure"></a> <a id="source-entitlement-example"></a> <a id="source-entitlement-types"></a>

### Entitlement Object

###### Entitlement Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the entitlement |
| sku_id | snowflake | ID of the SKU |
| application_id | snowflake | ID of the parent application |
| user_id? | snowflake | ID of the user who receives access to the entitlement's sku. |
| type | integer | Type of entitlement |
| deleted | boolean | Entitlement was deleted |
| starts_at | ?ISO8601 timestamp | Date and time when the entitlement becomes valid. |
| ends_at | ?ISO8601 timestamp | Date and time when the entitlement stops being valid. |
| guild_id? | snowflake | ID of the guild that receives access to the entitlement's sku. |
| consumed? | boolean | For consumable items, indicates whether the entitlement is already consumed. |

###### Entitlement Example

```
{
  "id": "1019653849998299136",
  "sku_id": "1019475255913222144",
  "application_id": "1019370614521200640",
  "user_id": "771129655544643584",
  "promotion_id": null,
  "type": 8,
  "deleted": false,
  "gift_code_flags": 0,
  "consumed": false,
  "starts_at": "2022-09-14T17:00:18.704163+00:00",
  "ends_at": "2022-10-14T17:00:18.704163+00:00",
  "guild_id": "1015034326372454400",
  "subscription_id": "1019653835926409216"
}

```

###### Entitlement Types

| Type | Value | Description |
| --- | --- | --- |
| PURCHASE | 1 | Entitlement was purchased by user |
| PREMIUM_SUBSCRIPTION | 2 | Entitlement for Discord Nitro subscription |
| DEVELOPER_GIFT | 3 | Entitlement was gifted by developer |
| TEST_MODE_PURCHASE | 4 | Entitlement bought by a developer while the application is in test mode. |
| FREE_PURCHASE | 5 | Entitlement issued because the SKU was free. |
| USER_GIFT | 6 | Entitlement given as a gift by another user. |
| PREMIUM_PURCHASE | 7 | Entitlement claimed at no charge by a Nitro Subscriber. |
| APPLICATION_SUBSCRIPTION | 8 | Entitlement bought as an app subscription. |


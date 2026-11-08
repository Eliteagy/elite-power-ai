# Subscription object
[Source](../../resources/stickers-and-subscriptions-index.md) / [Previous source section](../../resources/stickers/delete-guild-sticker.md) / [Following source section](subscription-object.md)

<a id="source-subscription-object"></a>

## Subscription Object

A Discord subscription represents recurring payments by a user for one or more SKUs over time. Successful payment gives the user access to the entitlements attached to the SKU.

<a id="source-subscription-object-1"></a>

### Subscription Object

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the subscription |
| user_id | snowflake | ID of the subscribed user |
| sku_ids | array of snowflakes | List of SKUs subscribed to |
| entitlement_ids | array of snowflakes | entitlements provided by this subscription |
| renewal_sku_ids | ?array of snowflakes | SKUs the user will remain subscribed to on renewal |
| current_period_start | ISO8601 timestamp | start timestamp for the active subscription period |
| current_period_end | ISO8601 timestamp | end timestamp for the active subscription period |
| status | SubscriptionStatus | Current status of the subscription |
| canceled_at | ?ISO8601 timestamp | When the subscription was canceled |
| country? | string | ISO3166-1 alpha-2 country code for the payment source used for purchase; absent unless a private OAuth scope was used for the query |

 The subscription ID determines when the subscription began. Renewal updates the current period. If the user cancels, the subscription moves to `ENDING`, and `canceled_at` records the cancellation time.

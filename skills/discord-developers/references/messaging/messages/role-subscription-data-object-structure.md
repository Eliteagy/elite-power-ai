# Role subscription data object structure
Context: Discord developer reference: Role subscription data object structure
[Source](attachments-and-message-creation-index.md) / [Previous source section](allowed-mentions-examples.md) / [Following source section](message-pin-object-struture.md)
<a id="source-role-subscription-data-object"></a> <a id="source-role-subscription-data-object-structure"></a>

### Role Subscription Data Object

###### Role Subscription Data Object Structure

| Field | Type | Description |
| --- | --- | --- |
| role_subscription_listing_id | snowflake | sku and listing id the user subscribed to |
| tier_name | string | tier name for the user's subscription |
| total_months_subscribed | integer | total number of months the user has subscribed |
| is_renewal | boolean | whether the notification represents a renewal instead of a new purchase |


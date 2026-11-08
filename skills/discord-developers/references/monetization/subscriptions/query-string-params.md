# Query string params
Context: Discord developer reference: Query string params
[Source](../../resources/stickers-and-subscriptions-index.md) / [Owning endpoint, event, object or procedure conditions](subscription-object.md) / [Previous source section](list-sku-subscriptions.md) / [Following source section](get-sku-subscription.md)
<a id="source-query-string-params"></a>

### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| before? | snowflake | List subscriptions before this ID | absent |
| after? | snowflake | List subscriptions after this ID | absent |
| limit? | integer | Number of results to return (1-100) | 50 |
| user_id? | snowflake | User ID whose subscriptions should be returned. Required unless the query is OAuth-based. | absent |


# Accessing entitlements with the HTTP API
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](accessing-entitlements-with-gateway-events.md) / [Following source section](accessing-entitlements-on-interaction-payloads.md)

<a id="source-accessing-entitlements-with-the-http-api"></a>

### Accessing Entitlements with the HTTP API

 Apps that run background jobs or do more than interaction handling need entitlement tracking. Use [List Entitlements](https://docs.discord.com/developers/resources/entitlement#list-entitlements) to retrieve active and expired entitlements. Filter by user or guild with `?user_id=XYZ` or `?guild_id=XYZ`. For example, an app might store entitlements in a database and verify access to a particular SKU before running a cron job or another task.

<a id="source-accessing-entitlements-with-the-http-api"></a>

### Accessing Entitlements with the HTTP API

 Use [List Entitlements](https://docs.discord.com/developers/resources/entitlement#list-entitlements) to retrieve entitlements. Filter by user or SKU set with `?user_id=XYZ` or `?sku_ids=XYZ`.

# Accessing entitlements with gateway events
[Source](eligibility-subscriptions-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-subscriptions.md) / [Previous source section](working-with-entitlements.md) / [Following source section](accessing-entitlements-with-the-http-api.md)

<a id="source-accessing-entitlements-with-gateway-events"></a>

### Accessing Entitlements with Gateway Events

 When users purchase in the app, Discord emits [Entitlement Gateway events](https://docs.discord.com/developers/events/gateway-events#entitlements). Subscription SKUs can produce these entitlement events:
| Event | Description |
| --- | --- |
| `ENTITLEMENT_CREATE` | When the user receives an entitlement for the app's subscription SKU |
| `ENTITLEMENT_UPDATE` | When entitlement access to a subscription SKU ends |
| `ENTITLEMENT_DELETE` | When a subscription refund, entitlement removal, or Test Entitlement deletion by a developer occurs |

<a id="source-accessing-entitlements-with-gateway-events"></a>

### Accessing Entitlements with Gateway Events

 When a SKU is purchased, Discord emits [`ENTITLEMENT_CREATE`](https://docs.discord.com/developers/events/gateway-events#entitlements). The event includes the entitlement object for access to the SKU, allowing near-time entitlement tracking. For One-Time Purchases, `ENTITLEMENT_DELETE` may also arrive if access is revoked.

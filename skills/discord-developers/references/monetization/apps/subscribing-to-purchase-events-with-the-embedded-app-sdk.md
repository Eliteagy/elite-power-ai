# Subscribing to purchase events with the embedded app SDK
Context: Discord developer reference: Subscribing to purchase events with the embedded app SDK
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Previous source section](key-concepts-initiating-purchases.md) / [Following source section](data-security-considerations.md)
<a id="source-subscribing-to-purchase-events-with-the-embedded-app-sdk"></a>

### Subscribing to Purchase Events with the Embedded App SDK

 After a purchase completes, Discord emits an `ENTITLEMENT_CREATE` event. Subscribe to `ENTITLEMENT_CREATE` with [`subscribe()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#subscribe) in the Embedded App SDK so the Activity detects a successful SKU purchase and granted entitlement. Example for `ENTITLEMENT_CREATE`:

```
import {DiscordSDK} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();

const handleEntitlementCreate = () => {
  // refetch entitlements from server using the Entitlement HTTP API endpoint
};
discordSdk.subscribe('ENTITLEMENT_CREATE', handleEntitlementCreate);

```

 The same `ENTITLEMENT_CREATE` event can be consumed through the [Gateway API](https://docs.discord.com/developers/events/gateway-events#entitlements) for backend processing, or you can retrieve user entitlements with the [List Entitlements](https://docs.discord.com/developers/resources/entitlement#list-entitlements) HTTP API endpoint.

---


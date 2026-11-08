# Data security considerations
Context: Discord developer reference: Data security considerations
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Previous source section](subscribing-to-purchase-events-with-the-embedded-app-sdk.md) / [Following source section](use-the-discord-http-api-for-verification.md)
<a id="source-data-security-considerations"></a>

### Data Security Considerations

 When an Activity uses SKUs and Entitlements, protect monetization data. Validate information received through [Embedded App SDK](https://docs.discord.com/developers/developer-tools/embedded-app-sdk) commands and events. An attacker could open a separate RPC connection and impersonate Discord to the client. That may be harmless for many SDK surfaces, but it matters for In-App purchases and premium perks. If entitlement decisions rely only on SDK data, the attacker could unlock paid products, features, or advantages without a purchase. [`getEntitlements()`](https://docs.discord.com/developers/developer-tools/embedded-app-sdk#getentitlements) is one command where this risk is relevant.


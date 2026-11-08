# Social commerce apis
Context: Discord developer reference: Social commerce apis
[Source](developers-index.md) / [Owning endpoint, event, object or procedure conditions](discord-game-shops.md) / [Previous source section](discord-game-shops-gifting-wishlists.md) / [Following source section](get-access-to-social-commerce.md)
<a id="source-social-commerce-apis"></a>

### Social Commerce APIs

 Social Commerce uses APIs that let a developer control catalog data, purchases, and fulfillment:
- **SKU & Storefront Management:** Create and maintain the item catalog, including cosmetics, bundles, and consumables. Manage pricing, availability, and metadata through the API to keep the store aligned with the game.
- **Entitlements:** Read and manage player ownership. When Discord completes a purchase, it creates an entitlement that the backend can check and use.
- **Fulfillment:** Receive webhook events immediately after purchase completion. Deliver the item in-game, then use the API to mark the entitlement fulfilled.
 Together, these APIs support an automated path from purchase through fulfillment, with Discord providing the payment experience and the game's backend delivering the item.


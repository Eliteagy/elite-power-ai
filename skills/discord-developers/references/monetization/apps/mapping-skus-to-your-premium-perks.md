# Mapping skus to your premium perks
Context: Discord developer reference: Mapping skus to your premium perks
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Previous source section](key-concepts-listing-skus.md) / [Following source section](formatting-and-displaying-prices.md)
<a id="source-mapping-skus-to-your-premium-perks"></a>

### Mapping SKUs to Your Premium Perks

 Buying a SKU creates an entitlement, and that entitlement represents access to that SKU. Map each SKU to the premium perk it unlocks so purchasers receive the correct benefit. Keep these rules in mind:
- Map SKUs to products by the `id` attribute, **not** by mutable fields such as `name`
- SKUs cannot be deleted; after purchase, access cannot be revoked by deleting the SKU, so every SKU should continue mapping to a perk or product


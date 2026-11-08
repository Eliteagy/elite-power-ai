# Formatting and displaying prices
Context: Discord developer reference: Formatting and displaying prices
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](key-concepts.md) / [Previous source section](mapping-skus-to-your-premium-perks.md) / [Following source section](working-with-entitlements.md)
<a id="source-formatting-and-displaying-prices"></a>

### Formatting and Displaying Prices

 SKU listing methods localize price and currency. `sku.price` includes numeric `amount` and string `currency` values. Correct currency rendering is difficult across many currencies, so the Embedded App SDK includes `PriceUtils` to help.

```
import {PriceUtils} from '@discord/embedded-app-sdk';

const displayPrice = PriceUtils.formatPrice(sku.price);
console.log(`The price is ${displayPrice}!`);

```

---


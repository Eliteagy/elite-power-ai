# Pricing your skus
Context: Discord developer reference: Pricing your skus
[Source](sku-management-and-pricing-index.md) / [Owning endpoint, event, object or procedure conditions](creating-a-sku.md) / [Previous source section](customizing-your-skus.md) / [Following source section](publishing-and-unpublishing-skus.md)
<a id="source-pricing-your-skus"></a>

### Pricing Your SKUs

 SKU prices are chosen from a predefined price list. Discord converts those prices into a user's local currency according to locale. Subscription SKUs renew monthly unless canceled. Changing a subscription SKU's price applies only to new subscribers; existing subscribers remain on the price active when they subscribed.

Using Unicode Emoji

For a standard Unicode emoji icon, put the emoji in `Unicode Emoji or Custom Emoji Name`. An emoji keyboard can help: MacOS uses `control + command + space bar`, and Windows uses `Windows + .`. (Figure: Set a unicode emoji)

Using a Custom Emoji

For a custom emoji, provide values in both fields:
- Name of your custom emoji
- ID of the custom emoji
To find an emoji ID in Discord, send the emoji escaped with a backslash `\`. For example, `\:uwu:` renders the emoji name and ID. (Figure: Set a custom emoji)

---


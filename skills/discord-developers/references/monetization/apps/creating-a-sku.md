# Creating a SKU
[Source](sku-management-and-pricing-index.md) / [Following source section](creating-a-sku.md)

<a id="source-managing-skus-overview"></a> <a id="source-overview"></a> <a id="source-creating-a-sku"></a>

# Managing Skus, Overview

> Discord Developers reference. Original prose; identifiers preserved verbatim.

## Overview

Covers: SKU creation and the parts that make up a Premium App.

## Creating a SKU

Premium items and subscriptions in an app are modeled as SKUs. **SKU** means Stock Keeping Unit, and each SKU uniquely identifies one premium offering. [SKUs](https://docs.discord.com/developers/resources/sku) form the base objects for premium offerings and are managed in the Developer Portal.

---

<a id="source-creating-a-sku-1"></a>

### Creating a SKU

 To add a SKU, open your [app's settings](https://discord.com/developers/applications), then go to [Monetization -> Manage SKUs](https://discord.com/developers/applications/select/skus). Select `Create SKU`; after `Create SKU` opens, the creation flow lets you choose one of these types:
- **User Subscription**: A renewing subscription whose benefits apply to one user across all servers
- **Guild Subscription**: A renewing subscription whose benefits apply to every user in one server
- **Consumable**: A one-time purchase that grants a temporary benefit and is used up when consumed.
- **Durable**: A one-time purchase that **grants** a permanent item, capability, or improvement.
 After choosing the SKU type, provide the SKU name to proceed.

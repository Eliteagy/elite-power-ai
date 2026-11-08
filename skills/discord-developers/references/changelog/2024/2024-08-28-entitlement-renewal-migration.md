# Subscription entitlement renewal migration

Date: 2024-08-28
Categories: Premium Apps, Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2558) · [Year index](INDEX.md)

<a id="source-subscription-entitlement-migration-guide"></a>

### Subscription Entitlement Migration Guide

Starting on **October 1, 2024**, Discord is migrating the existing entitlement system to behavior where **entitlements do not expire until explicitly canceled**. The guide describes developer-facing changes and how to manage them. With this update, subscription SKU entitlements no longer emit events when a new billing period begins. To detect renewal, use the new [Subscription API](https://docs.discord.com/developers/resources/subscription) and related [Subscription Gateway Events](https://docs.discord.com/developers/events/gateway-events#subscriptions).

<a id="source-current-system"></a>

### Current System

Subscription SKUs purchased through Discord currently have entitlements with:
- An `ends_at` date tied to the subscription interval, updated each billing cycle.
- An entitlement `type` value of `APPLICATION_SUBSCRIPTION` (type `8`).
- An `ENTITLEMENT_UPDATE` event at the start of each new subscription period.

<a id="source-new-system"></a>

### New System

After migration, entitlements for Subscription SKUs purchased through Discord will:
- Have no end date until cancellation (`ends_at` will be `null`).
- Use entitlement `type` value `PURCHASE` (type `1`).
- Stop sending `ENTITLEMENT_UPDATE` events until the subscription is canceled.

<a id="source-migration-timeline"></a>

### Migration Timeline

- **Migration Start Date:** October 1, 2024
- **Migration End Date:** November 1, 2024

<a id="source-migration-impacts"></a> <a id="source-1-existing-entitlements-scheduled-to-renew"></a>

### Migration Impacts

### 1) Existing Entitlements Scheduled to Renew

- **During Migration Window:**
  - These entitlements transfer to the new system automatically.
  - A new `ENTITLEMENT_CREATE` event marks the migration, but does not represent a net new entitlement.
  - No further events are generated until the entitlement ends, which then triggers `ENTITLEMENT_UPDATE`.
  - In both the `ENTITLEMENT_UPDATE` event and the Entitlement API, `ends_at` gives the entitlement end timestamp.

<a id="source-2-existing-entitlements-set-to-end"></a>

### 2) Existing Entitlements Set to End

- **During Migration Window:**
  - These entitlements expire normally and do not renew under the new system.
  - No new entitlement events are generated for these cases.

<a id="source-developer-actions"></a>

### Developer Actions

- **Pre-Migration:**
  - Review the new entitlement event structure.
  - Update systems to handle `ends_at` as null, meaning the entitlement is indefinite.
  - Stop expecting type `APPLICATION_SUBSCRIPTION` (type `8`) for Discord-managed subscription entitlements.

- **Post-Migration:**
  - Watch for `ENTITLEMENT_CREATE`, `ENTITLEMENT_UPDATE`, `SUBSCRIPTION_CREATE`, and `SUBSCRIPTION_UPDATE` events.
  - Update references to entitlement `ends_at` timestamps so they represent the entitlement end. To find a subscription period end, use the [Subscription API](https://docs.discord.com/developers/resources/subscription) and related [Subscription Gateway Events](https://docs.discord.com/developers/events/gateway-events#subscriptions).

[Migration announcement](2024-08-28-entitlement-migration-and-subscription-api.md).

# Entitlement object get entitlement
Context: Discord developer reference: Entitlement object get entitlement
[Source](../../resources/emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](entitlement-object.md) / [Previous source section](entitlement-object-list-entitlements.md) / [Following source section](consume-an-entitlement.md)
<a id="source-get-entitlement"></a>

### Get Entitlement

 GET/applications/[{application.id}](https://docs.discord.com/developers/resources/application#application-object)/entitlements/[{entitlement.id}](https://docs.discord.com/developers/resources/entitlement#entitlement-object) Returns a single entitlement.

```
{
  "id": "1019653849998299136",
  "sku_id": "1019475255913222144",
  "application_id": "1019370614521200640",
  "user_id": "771129655544643584",
  "promotion_id": null,
  "type": 8,
  "deleted": false,
  "gift_code_flags": 0,
  "consumed": false,
  "starts_at": "2022-09-14T17:00:18.704163+00:00",
  "ends_at": "2022-10-14T17:00:18.704163+00:00",
  "guild_id": "1015034326372454400",
  "subscription_id": "1019653835926409216"
}

```


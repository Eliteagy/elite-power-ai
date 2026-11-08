# Create test entitlement
Context: Discord developer reference: Create test entitlement
[Source](../../resources/emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](entitlement-object.md) / [Previous source section](consume-an-entitlement.md) / [Following source section](delete-test-entitlement.md)
<a id="source-create-test-entitlement"></a> <a id="source-json-params-4"></a>

### Create Test Entitlement

 POST/applications/[{application.id}](https://docs.discord.com/developers/resources/application#application-object)/entitlements Creates a test entitlement for a given SKU and guild or user. Discord treats that user or guild as entitled to the premium offering. The response is a partial entitlement object and does **not** include `subscription_id`, `starts_at`, or `ends_at`, because the test entitlement remains valid indefinitely. Reload the Discord client after creation; the server or user will then show premium access.

###### JSON Params

| param | type | description |
| --- | --- | --- |
| sku_id | string | ID of the SKU that receives the entitlement grant. |
| owner_id | string | ID of the guild or user receiving the entitlement. |
| owner_type | integer | `1` for a guild subscription, `2` for a user subscription. |

```
{
  "sku_id": "999184799365857331",
  "owner_id": "847184799365857999",
  "owner_type": 1
}

```


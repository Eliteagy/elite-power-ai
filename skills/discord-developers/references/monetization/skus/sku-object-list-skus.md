# SKU object list skus
Context: Discord developer reference: SKU object list skus
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](sku-object.md) / [Previous source section](sku-object-sku-structure.md) / [Following source section](../../guilds/soundboard/soundboard-sound-object.md)
<a id="source-list-skus"></a>

### List SKUs

 GET/applications/[{application.id}](https://docs.discord.com/developers/resources/application#application-object)/skus Returns every SKU for the application. Because of Discord's SKU and subscription model, a subscription offering appears as two SKUs. For subscription entitlement integration and testing, use the SKU whose `type: 5`.

```
[
  {
    "id": "1088510053843210999",
    "type": 6,
    "dependent_sku_id": null,
    "application_id": "788708323867885999",
    "manifest_labels": null,
    "access_type": 1,
    "name": "Test Premium",
    "features": [],
    "release_date": null,
    "premium": false,
    "slug": "test-premium",
    "flags": 128,
    "show_age_gate": false
  },
  {
    "id": "1088510058284990888",
    "type": 5,
    "dependent_sku_id": null,
    "application_id": "788708323867885999",
    "manifest_labels": null,
    "access_type": 1,
    "name": "Test Premium",
    "features": [],
    "release_date": null,
    "premium": false,
    "slug": "test-premium",
    "flags": 128,
    "show_age_gate": false
  }
]

```


# Sticker pack object
Context: Discord developer reference: Sticker pack object
[Source](../stickers-and-subscriptions-index.md) / [Owning endpoint, event, object or procedure conditions](sticker-object.md) / [Previous source section](sticker-item-object.md) / [Following source section](sticker-object-get-sticker.md)
<a id="source-sticker-pack-object"></a> <a id="source-sticker-pack-structure"></a> <a id="source-example-sticker-pack"></a>

### Sticker Pack Object

 Describes a standard sticker pack.

###### Sticker Pack Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of the sticker pack |
| stickers | array of sticker objects | the stickers in the pack |
| name | string | name of the sticker pack |
| sku_id | snowflake | ID of the pack SKU |
| cover_sticker_id? | snowflake | ID of the pack sticker used as the pack icon |
| description | string | description of the sticker pack |
| banner_asset_id? | snowflake | ID of the sticker pack banner image |

###### Example Sticker Pack

```
{
  "id": "847199849233514549",
  "stickers": [],
  "name": "Wumpus Beyond",
  "sku_id": "847199849233514547",
  "cover_sticker_id": "749053689419006003",
  "description": "Say hello to Wumpus!",
  "banner_asset_id": "761773777976819732"
}

```


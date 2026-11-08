# Create guild sticker
Context: Discord developer reference: Create guild sticker
[Source](../stickers-and-subscriptions-index.md) / [Owning endpoint, event, object or procedure conditions](sticker-object.md) / [Previous source section](get-guild-sticker.md) / [Following source section](modify-guild-sticker.md)
<a id="source-create-guild-sticker"></a> <a id="source-form-params"></a>

### Create Guild Sticker

  Creates a guild sticker. Use a `multipart/form-data` request and the `CREATE_GUILD_EXPRESSIONS` permission. On success, the endpoint returns the created [sticker](https://docs.discord.com/developers/resources/sticker#sticker-object) object and emits a [Guild Stickers Update](https://docs.discord.com/developers/events/gateway-events#guild-stickers-update) Gateway event. Guilds start with five free sticker slots, and Boost levels add more. The endpoint accepts the `X-Audit-Log-Reason` header. Lottie uploads are allowed only in guilds with the `VERIFIED` and/or `PARTNERED` [guild feature](https://docs.discord.com/developers/resources/guild#guild-object-guild-features). Uploaded animated stickers may be no longer than 5 seconds and must fit 320 x 320 pixels.

###### Form Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the sticker (2-30 characters) |
| description | string | sticker description, either empty or 2-100 characters |
| tags | string | sticker autocomplete/suggestion tags (max 200 characters) |
| file | file contents | file upload for the sticker; must be PNG, APNG, GIF, or Lottie JSON, max 512 KiB |


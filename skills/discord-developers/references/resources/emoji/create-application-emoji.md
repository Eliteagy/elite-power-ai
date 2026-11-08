# Create application emoji
Context: Discord developer reference: Create application emoji
[Source](../emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](emoji-object.md) / [Previous source section](get-application-emoji.md) / [Following source section](modify-application-emoji.md)
<a id="source-create-application-emoji"></a> <a id="source-json-params-2"></a>

### Create Application Emoji

  Creates an emoji for the application and returns the new [emoji](https://docs.discord.com/developers/resources/emoji#emoji-object) object on success. Emoji and animated emoji files are limited to 256 KiB. Uploads above the limit fail with 400 Bad Request and an error message, but no [JSON status code](https://docs.discord.com/developers/topics/opcodes-and-status-codes#json). Discord strongly recommends `.webp` when fetching emoji for performance and compatibility. See [Emoji Formats](https://docs.discord.com/developers/resources/emoji#emoji-object-emoji-formats) for details.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the emoji |
| image | image data | the 128x128 emoji image |


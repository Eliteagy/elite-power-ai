# Embed image structure
Context: Discord developer reference: Embed image structure
[Source](attachments-and-message-creation-index.md) / [Owning endpoint, event, object or procedure conditions](embed-object-embed-structure.md) / [Following source section](embed-video-structure.md) / [Following source section](embed-media-flags.md)
<a id="source-message-part-2"></a> <a id="source-embed-image-structure"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

###### Embed Image Structure

| Field | Type | Description |
| --- | --- | --- |
| url | string | image source URL; supports only http(s) and attachments |
| proxy_url? | string | proxied URL for the image |
| height? | integer | height of image |
| width? | integer | width of image |
| content_type? | string | the image’s media type |
| placeholder? | string | thumbhash placeholder of the image |
| placeholder_version? | integer | version of the placeholder |
| description? | string | image description used as alt text |
| flags? | integer | embed media flags packed into a bitfield |


# Embed video structure
Context: Discord developer reference: Embed video structure
[Source](message-objects-and-embeds-index.md) / [Source](attachments-and-message-creation-index.md) / [Owning endpoint, event, object or procedure conditions](embed-object-embed-structure.md) / [Previous source section](embed-image-structure.md)
<a id="source-embed-video-structure"></a>

###### Embed Video Structure
| Field | Type | Description |
| --- | --- | --- |
| url? | string | source url of video |
| proxy_url? | string | proxied URL for the video |
| height? | integer | height of video |
| width? | integer | width of video |
| content_type? | string | the video’s media type |
| placeholder? | string | thumbhash placeholder of the video |
| placeholder_version? | integer | version of the placeholder |
| description? | string | video description used as alt text |
| flags? | integer | embed media flags packed into a bitfield |


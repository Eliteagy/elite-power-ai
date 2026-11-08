# Unfurled media item
Context: Discord developer reference: Unfurled media item
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox-modal-examples.md) / [Following source section](uploading-a-file.md)
<a id="source-unfurled-media-item"></a> <a id="source-unfurled-media-item-structure"></a> <a id="source-unfurled-media-item-flags"></a>

### Unfurled Media Item

 An Unfurled Media Item represents media by URL for use inside a component. It may refer to media uploaded to Discord or to an external asset by **a direct link**. The structure below shows the complete object, but developers can set only `url` in requests using this structure. Discord fills every other field automatically.

###### Unfurled Media Item Structure

| Field | Type | Description |
| --- | --- | --- |
| url | string | Supports arbitrary urls and `attachment://<filename>` references |
| proxy_url? * | string | proxied URL for the media item |
| height? * | ?integer | media item height, when the media is an image or video |
| width? * | ?integer | media item width, when the media is an image or video |
| placeholder? * | string | thumbhash placeholder, when the media is an image or video |
| placeholder_version? * | integer | placeholder version, when the media is an image or video |
| content_type? * | string | content media type |
| flags? * | integer | bitfield combining Unfurled media item flags |
| attachment_id? * ** | snowflake | uploaded attachment id |

 * The API ignores this field in requests and supplies it in responses. ** Present only when the media item came from an uploaded attachment.

###### Unfurled Media Item Flags

| Flag | Value | Description |
| --- | --- | --- |
| IS_ANIMATED | `1 << 0` | This image is animated |


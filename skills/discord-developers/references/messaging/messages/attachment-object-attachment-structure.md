# Attachment object attachment structure
Context: Discord developer reference: Attachment object attachment structure
[Source](attachments-and-message-creation-index.md) / [Previous source section](embed-fields-by-embed-type.md) / [Following source section](channel-mention-structure.md)
<a id="source-attachment-object"></a> <a id="source-attachment-structure"></a> <a id="source-attachment-flags"></a>

### Attachment Object

###### Attachment Structure

 In Message Create/Edit requests, only `id` is required inside the `attachments` array.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | attachment id |
| filename | string | name of file attached |
| title? | string | the title of the file |
| description? | string | file description used as alt text (max 1024 characters) |
| content_type? | string | the attachment’s media type |
| size | integer | size of file in bytes |
| url | string | source url of file |
| proxy_url | string | a proxied url of file |
| height? | ?integer | file height, for images or videos |
| width? | ?integer | file width, for images or videos |
| placeholder? | string | thumbhash placeholder for images or videos |
| placeholder_version? | integer | placeholder version for images or videos |
| ephemeral? * | boolean | whether this attachment is ephemeral |
| duration_secs? | float | audio duration, currently used for voice messages |
| waveform? | string | base64 encoded bytearray for a sampled waveform, currently used for voice messages |
| flags? | integer | attachment flags packed into a bitfield |
| clip_participants? | array of user objects | for Clips, users present in the stream |
| clip_created_at? | ISO8601 timestamp | for Clips, the clip creation time |
| application? | ?application | for Clips, the stream application when recognized |

 * Ephemeral attachments are removed automatically after a set time. On messages, ephemeral attachments remain available for at least as long as the message exists.

###### Attachment Flags

| Flag | Value | Description |
| --- | --- | --- |
| IS_CLIP | `1 << 0` | attachment is a stream Clip |
| IS_THUMBNAIL | `1 << 1` | attachment is a media-channel thread thumbnail shown in the grid but not on the message |
| IS_REMIX | `1 << 2` | attachment was edited with the deprecated mobile remix feature |
| IS_SPOILER | `1 << 3` | attachment is spoiler-marked and blurred until clicked |
| IS_ANIMATED | `1 << 5` | attachment is an animated image |


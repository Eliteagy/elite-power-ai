# Thumbnail
Context: Discord developer reference: Thumbnail
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](text-display-examples.md) / [Following source section](media-gallery.md)
<a id="source-thumbnail"></a> <a id="source-thumbnail-structure"></a> <a id="source-examples-2"></a>

### Thumbnail

 A Thumbnail presents a content component that displays visual media in one small form-factor. It is intended as one accessory for to other content, plus is primarily usable with [sections](https://docs.discord.com/developers/components/reference#section). This media displayed is defined by this [unfurled media item](https://docs.discord.com/developers/components/reference#unfurled-media-item) structure, which supports both uploaded media plus externally hosted media. Thumbnails are currently works only in messages as an accessory in one [section](https://docs.discord.com/developers/components/reference#section). Thumbnails currently only support images, covering animated formats like GIF plus WEBP. Videos are not supported at the this time. To use this component, you need to send this [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2), and that flag is enabled per message.

###### Thumbnail Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `11` for thumbnail component |
| id? | integer | Optional identifier for component |
| media | unfurled media item | A url or attachment provided as an unfurled media item |
| description? | ?string | Alt text for the media, max 1024 characters |
| spoiler? | boolean | Whether the thumbnail must be a spoiler (or blurred out). Default value is `false` |

###### Examples

Message Example

Message create payload with a Thumbnail component (via Section)

(Figure: Example of a Thumbnail in a Section from that code below)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 9,  // ComponentType.SECTION
      "components": [
        {
          "type": 10,  // ComponentType.TEXT_DISPLAY
          "content": "# Real Game v7.3"
        },
        {
          "type": 10,  // ComponentType.TEXT_DISPLAY
          "content": "Hope you're excited, the update is finally here! Here are some of the changes:\n- Fixed a bug where certain treasure chests wouldn't open properly\n- Improved server stability during peak hours\n- Added a new type of gravity that will randomly apply when the moon is visible in-game\n- Every third thursday the furniture will scream your darkest secrets to nearby npcs"
        },
        {
          "type": 10,  // ComponentType.TEXT_DISPLAY
          "content": "-# That last one wasn't real, but don't use voice chat near furniture just in case..."
        }
      ],
      "accessory": {
        "type": 11,  // ComponentType.THUMBNAIL
        "media": {
          "url": "https://websitewithopensourceimages/gamepreview.webp"
        }
      }
    }
  ]
}

```

---


# File
Context: Discord developer reference: File
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](media-gallery.md) / [Following source section](separator.md)
<a id="source-file"></a> <a id="source-file-structure"></a> <a id="source-examples-4"></a>

### File

 A File provides a top-level content component that permits you to display one [uploaded file](https://docs.discord.com/developers/components/reference#uploading-a-file) as an attachment to that message and reference it within this component. Each file component may only display 1 attached file, but you can upload multiple files plus add them to different file components within your payload. Files are currently works only in messages. The File component only supports using this `attachment://` protocol in [unfurled media item](https://docs.discord.com/developers/components/reference#unfurled-media-item) Messages can use this component only once they include the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) and that flag is enabled per message.

###### File Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `13` for a file component |
| id? | integer | Optional identifier for component |
| file | unfurled media item | This unfurled media item is unique inside that it **only** supports attachment references using this `attachment://<filename>` syntax |
| spoiler? | boolean | Whether the media must be a spoiler (or blurred out). Default value is `false` |
| name? | string | The name for the file. This field is ignored and provided by this API as part for the response |
| size? | integer | The size for the file in bytes. This field is ignored and provided by this API as part for the response |

###### Examples

Message Example

Message create payload with a File component

(Figure: Example of a File showing a download for one game and manual)This example makes use for this `attachment://` protocol functionality in [unfurled media item](https://docs.discord.com/developers/components/reference#unfurled-media-item).

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,  // ComponentType.TEXT_DISPLAY
      "content": "# New game version released for testing!\nGrab the game here:"
    },
    {
      "type": 13,  // ComponentType.FILE
      "file": {
        "url": "attachment://game.zip"
      }
    },
    {
      "type": 10,  // ComponentType.TEXT_DISPLAY
      "content": "Latest manual artwork here:"
    },
    {
      "type": 13,  // ComponentType.FILE
      "file": {
        "url": "attachment://manual.pdf"
      }
    }
  ]
}

```

---


# Media gallery
Context: Discord developer reference: Media gallery
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](thumbnail.md) / [Following source section](file.md)
<a id="source-media-gallery"></a> <a id="source-media-gallery-structure"></a> <a id="source-media-gallery-item-structure"></a> <a id="source-examples-3"></a>

### Media Gallery

 A Media Gallery provides a top-level content component that permits you to display 1-10 media attachments in one organized gallery format. Each item can have optional descriptions and may be marked as spoilers. Media Galleries are currently works only in messages. Messages can use this component only once they include the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) and that flag is enabled per message.

###### Media Gallery Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `12` for media gallery component |
| id? | integer | Optional identifier for component |
| items | array of media gallery items | 1 to 10 media gallery items |

###### Media Gallery Item Structure

| Field | Type | Description |
| --- | --- | --- |
| media | unfurled media item | A url or attachment provided as an unfurled media item |
| description? | ?string | Alt text for the media, max 1024 characters |
| spoiler? | boolean | Whether the media must be a spoiler (or blurred out). Default value is `false` |

###### Examples

Message Example

Message create payload with a Media Gallery component

(Figure: Example of a Media Gallery showing screenshots from live webcam feeds)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 10,  // ComponentType.TEXT_DISPLAY
      "content": "Live webcam shots as of 18-04-2025 at 12:00 UTC"
    },
    {
      "type": 12,  // ComponentType.MEDIA_GALLERY
      "items": [
        {
          "media": {"url": "https://livevideofeedconvertedtoimage/webcam1.webp"},
          "description": "An aerial view looking down on older industrial complex buildings. The main building is white with many windows and pipes running up the walls."
        },
        {
          "media": {"url": "https://livevideofeedconvertedtoimage/webcam2.webp"},
          "description": "An aerial view of old broken buildings. Nature has begun to take root in the rooftops. A portion of the middle building's roof has collapsed inward. In the distant haze you can make out a far away city."
        },
        {
          "media": {"url": "https://livevideofeedconvertedtoimage/webcam3.webp"},
          "description": "A street view of a downtown city. Prominently in photo are skyscrapers and a domed building"
        }
      ]
    }
  ]
}

```

---


# Section
Context: Discord developer reference: Section
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](channel-select-modal-response.md) / [Following source section](text-display.md)
<a id="source-section"></a> <a id="source-section-structure"></a> <a id="source-section-child-components"></a> <a id="source-section-accessory-components"></a> <a id="source-examples"></a>

### Section

 A Section acts as a top-level layout component that permits you to contextually associate content with an accessory component. This typical use-case is to contextually associate [text content](https://docs.discord.com/developers/components/reference#text-display) with one [accessory](https://docs.discord.com/developers/components/reference#section-section-accessory-components). Sections are currently works only in messages. Messages can use this component only once they include the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) and that flag is enabled per message.

###### Section Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `9` for section component |
| id? | integer | Optional identifier for component |
| components | array of section child components | One to three child components representing the content for the section that is contextually associated to that accessory |
| accessory | section accessory component | A component that is contextually associated to that content for the section |

 Don’t hardcode `components` to contain only text current components. We may add other components within the future. Similarly, `accessory` may be expanded to include other components within the future.

###### Section Child Components

| Available Components |
| --- |
| Text Display |

###### Section Accessory Components

| Available Components |
| --- |
| Button |
| Thumbnail |

###### Examples

Message Example

Message create payload with a Section (and Thumbnail) component

(Figure: Example of a Section showing one fake game changelog and a thumbnail)

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


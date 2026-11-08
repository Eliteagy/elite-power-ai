# Embed object embed structure
Context: Discord developer reference: Embed object embed structure
[Source](message-objects-and-embeds-index.md) / [Previous source section](reaction-count-details-object.md) / [Following source section](embed-video-structure.md)
<a id="source-embed-object"></a> <a id="source-embed-structure"></a> <a id="source-embed-types"></a> <a id="source-embed-flags"></a>

### Embed Object

###### Embed Structure

| Field | Type | Description |
| --- | --- | --- |
| title? | string | title of embed |
| type? | string | embed type; webhook embeds always use rich |
| description? | string | description of embed |
| url? | string | url of embed |
| timestamp? | ISO8601 timestamp | timestamp of embed content |
| color? | integer | color code of the embed |
| footer? | embed footer object | footer information |
| image? | embed image object | image information |
| thumbnail? | embed image object | thumbnail information |
| video? | embed video object | video information |
| provider? | embed provider object | provider information |
| author? | embed author object | author information |
| fields? | array of embed field objects | fields information, max of 25 |
| flags? | integer | embed flags encoded as a bitfield |

###### Embed Types

| Type | Description |
| --- | --- |
| rich | generic embed produced from embed attributes |
| image | image embed |
| video | video embed |
| gifv | animated gif image embed displayed as a video embed |
| article | article embed |
| link | link embed |
| poll_result | poll result embed |

###### Embed Flags

| Flag | Value | Description |
| --- | --- | --- |
| IS_CONTENT_INVENTORY_ENTRY | `1 << 5` | embed is a fallback for replying to an activity card |


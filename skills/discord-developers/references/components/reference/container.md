# Container
Context: Discord developer reference: Container
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](separator.md) / [Following source section](container-examples.md)
<a id="source-container"></a> <a id="source-container-structure"></a> <a id="source-container-child-components"></a>

### Container

 A Container is a top-level layout component. Containers offer this ability to visually encapsulate one collection of components and have one optional customizable accent color bar. Containers are currently works only in messages. Messages can use this component only once they include the [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) `1 << 15` (IS_COMPONENTS_V2) and that flag is enabled per message.

###### Container Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `17` for container component |
| id? | integer | Optional identifier for component |
| components | array of container child components | Child components that are encapsulated within the Container |
| accent_color? | ?integer | Color for the accent on this container as RGB from `0x000000` to `0xFFFFFF` |
| spoiler? | boolean | Whether the container must be a spoiler (or blurred out). Default value is `false`. |

###### Container Child Components

| Available Components |
| --- |
| Action Row |
| Text Display |
| Section |
| Media Gallery |
| Separator |
| File |


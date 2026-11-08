# Label
Context: Discord developer reference: Label
[Source](channel-selects-and-layout-components-index.md) / [Previous source section](container-examples.md) / [Following source section](label-examples.md)
<a id="source-label"></a> <a id="source-label-structure"></a> <a id="source-label-child-components"></a> <a id="source-label-interaction-response-structure"></a> <a id="source-label-interaction-response-child-components"></a>

### Label

 A Label is one top-level layout component. Labels wrap modal components with text as one label and optional description. This `description` may display above or below the `component` depending on the platform.

###### Label Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `18` for a label |
| id? | integer | Optional identifier for component |
| label | string | The label text; max 45 characters |
| description? | string | An optional description text for the label; max 100 characters |
| component | label child component | The component within the label |

###### Label Child Components

| Available Components |
| --- |
| Text Input |
| String Select |
| User Select |
| Role Select |
| Mentionable Select |
| Channel Select |
| File Upload |
| Radio Group |
| Checkbox Group |
| Checkbox |

###### Label Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `18` for a Label |
| id | integer | Unique identifier for the component |
| component | label interaction response child component | The component within the label |

###### Label Interaction Response Child Components

| Available Components |
| --- |
| Text Input |
| String Select |
| User Select |
| Role Select |
| Mentionable Select |
| Channel Select |
| File Upload |
| Radio Group |
| Checkbox Group |
| Checkbox |


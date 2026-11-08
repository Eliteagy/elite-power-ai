# Checkbox group interaction response structure
Context: Discord developer reference: Checkbox group interaction response structure
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox-group-option-structure.md) / [Following source section](checkbox-group-modal-examples.md)
<a id="source-checkbox-group-interaction-response-structure"></a>

### Checkbox Group Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `22` for a Checkbox Group |
| id | integer | Unique identifier for the component |
| custom_id | string | developer-provided input identifier, from 1 to 100 characters |
| values | array of strings | selected option values, or an empty array `[]` if none are selected |


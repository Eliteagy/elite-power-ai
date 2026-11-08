# Checkbox interaction response structure
Context: Discord developer reference: Checkbox interaction response structure
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox-structure.md) / [Following source section](checkbox-modal-examples.md)
<a id="source-checkbox-interaction-response-structure"></a>

### Checkbox Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `23` for a Checkbox |
| id | integer | Unique identifier for the component |
| custom_id | string | developer-provided input identifier, from 1 to 100 characters |
| value | boolean | checkbox state: `true` when checked, `false` when unchecked |


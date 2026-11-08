# Radio group structure
Context: Discord developer reference: Radio group structure
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](radio-group.md) / [Following source section](radio-group-option-structure.md)
<a id="source-radio-group-structure"></a>

### Radio Group Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `21` for radio group |
| id? | integer | Optional identifier for component |
| custom_id | string | developer-provided input identifier, from 1 to 100 characters |
| options | array of radio group options | options displayed to the user; minimum 2 and maximum 10 |
| required? | boolean | whether modal submission requires a selected option; defaults to `true` |


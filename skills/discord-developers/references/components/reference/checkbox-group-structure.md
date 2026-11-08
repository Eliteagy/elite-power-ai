# Checkbox group structure
Context: Discord developer reference: Checkbox group structure
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox-group.md) / [Following source section](checkbox-group-option-structure.md)
<a id="source-checkbox-group-structure"></a>

### Checkbox Group Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `22` for checkbox group |
| id? | integer | Optional identifier for component |
| custom_id | string | developer-provided input identifier, from 1 to 100 characters |
| options | array of checkbox group options | options displayed to the user; minimum 1 and maximum 10 |
| min_values?* | integer | minimum selections required; min 0, max 10, default 1; |
| max_values? | integer | maximum selections allowed; min 1, max 10, default equals the option count |
| required? | boolean | whether the group must be completed; defaults to `true` |

 * If `required` is omitted or set to `true`, `min_values` must be omitted or have a value of at least `1`.


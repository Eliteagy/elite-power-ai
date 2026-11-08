# Checkbox structure
Context: Discord developer reference: Checkbox structure
[Source](radio-checkbox-and-label-components-index.md) / [Previous source section](checkbox.md) / [Following source section](checkbox-interaction-response-structure.md)
<a id="source-checkbox-structure"></a>

### Checkbox Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `23` for checkbox |
| id? | integer | Optional identifier for component |
| custom_id | string | developer-provided input identifier, from 1 to 100 characters |
| default? | boolean | whether the checkbox starts checked |

 A checkbox cannot be marked required directly. For similar behavior, use a [Checkbox Group](https://docs.discord.com/developers/components/reference#checkbox-group) containing one option and set `required`.


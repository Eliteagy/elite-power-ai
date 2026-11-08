# Text input
Context: Discord developer reference: Text input
[Source](buttons-and-select-menus-index.md) / [Previous source section](string-select-modal-examples.md) / [Following source section](text-input-examples.md)
<a id="source-text-input"></a> <a id="source-text-input-structure"></a> <a id="source-text-input-styles"></a> <a id="source-text-input-interaction-response-structure"></a>

### Text Input

 Text Input is an interactive component for free-form text responses in modals. It supports both short single-line input and longer paragraph input. Text Inputs can be used only inside modals and must be placed in a [Label](https://docs.discord.com/developers/components/reference#label). Discord no longer recommends placing Text Input inside an [Action Row](https://docs.discord.com/developers/components/reference#action-row) in modals; all future Text Inputs should be placed inside a [Label](https://docs.discord.com/developers/components/reference#label) component.

###### Text Input Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `4` for a text input |
| id? | integer | Optional identifier for component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| style | integer | The Text Input Style |
| min_length? | integer | Minimum text input length; minimum 0, maximum 4000 |
| max_length? | integer | Maximum text input length; minimum 1, maximum 4000 |
| required? | boolean | Whether filling this component is required; defaults to `true` |
| value? | string | Initial value filled into this component; maximum 4000 characters |
| placeholder? | string | Custom placeholder displayed when the input is empty; maximum 100 characters |

 The `label` field on Text Input is deprecated; use `label` and `description` on the [Label](https://docs.discord.com/developers/components/reference#label) component instead.

###### Text Input Styles

| Name | Value | Description |
| --- | --- | --- |
| Short | 1 | Single-line input |
| Paragraph | 2 | Multi-line input |

###### Text Input Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | `4` for a Text Input |
| id | integer | Unique identifier for the component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| value | string | The user’s input text |


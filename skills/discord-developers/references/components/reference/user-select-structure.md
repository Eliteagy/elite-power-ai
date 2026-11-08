# User select structure
Context: Discord developer reference: User select structure
[Source](user-role-and-mentionable-selects-index.md) / [Owning endpoint, event, object or procedure conditions](user-select.md) / [Following source section](user-select-message-response-modal-request.md)
<a id="source-components--reference-part-2"></a> <a id="source-select-default-value-structure"></a> <a id="source-user-select-interaction-response-structure"></a> <a id="source-examples"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

* `min_values` must be omitted or set to at least `1` when `required` is omitted or `true`. ** The `required` field applies only to User Selects in modals and is ignored in messages. *** Setting `disabled` inside a modal causes an error because disabled components are not currently supported in modals.

###### Select Default Value Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID for a user, role, or channel |
| type | string | Value category represented by `id`; valid values are `"user"`, `"role"`, or `"channel"` |

###### User Select Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type* | integer | `5` for a User Select |
| component_type* | integer | `5` for a User Select |
| id | integer | Unique identifier for the component |
| custom_id | string | Input identifier chosen by the developer; 1-100 characters |
| resolved | resolved data | Resolved entities from selected options |
| values | array of snowflakes | IDs of the selected users |

 * Message interaction responses include `component_type`; modal interaction responses include `type`.

###### Examples

Message Example

Payload for creating a message with a User Select component

(Figure: User Select example showing two people and an app in a server)

```
{
  "flags": 32768,
  "components": [
    {
      "type": 1,  // ComponentType.ACTION_ROW
      "components": [
        {
          "type": 5,  // ComponentType.USER_SELECT
          "custom_id": "user_select",
          "placeholder": "Select a user"
        }
      ]
    }
  ]
}

```

Message Interaction Data Example

A user chooses an option in a message User Select

When a user uses a User Select in a message, the interaction data payload has this basic shape. See the [interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-structure) reference for the complete payload. If a user is selected, `resolved` can include both `members` and `users`.


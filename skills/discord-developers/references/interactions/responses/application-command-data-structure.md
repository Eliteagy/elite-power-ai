# Application command data structure
Context: Discord developer reference: Application command data structure
[Source](interaction-objects-and-responses-index.md) / [Owning endpoint, event, object or procedure conditions](interaction-object-interaction-structure.md) / [Following source section](message-interaction-object.md)
<a id="source-application-command-data-structure"></a> <a id="source-message-component-data-structure"></a> <a id="source-modal-submit-data-structure"></a> <a id="source-component-interaction-response-structures"></a> <a id="source-resolved-data-structure"></a> <a id="source-application-command-interaction-data-option-structure"></a>

###### Application Command Data Structure

 Used with `APPLICATION_COMMAND` and `APPLICATION_COMMAND_AUTOCOMPLETE` interactions.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | `ID` of the invoked command |
| name | string | `name` of the invoked command |
| type | integer | `type` of the invoked command |
| resolved? | resolved data | Converted users + roles + channels + attachments |
| options?* | array of application command interaction data option | Params + values from the user |
| guild_id? | snowflake | Guild ID where the command is registered |
| target_id? | snowflake | ID of the user or message selected by a user or message command |

 * This [can be partial](https://docs.discord.com/developers/interactions/application-commands#autocomplete) for `APPLICATION_COMMAND_AUTOCOMPLETE` responses

###### Message Component Data Structure

| Field | Type | Description |
| --- | --- | --- |
| custom_id | string | `custom_id` of the component |
| component_type | integer | type of the component |
| values?* | array of select option values | Values chosen by the user in a select menu component |
| resolved? | resolved data | Resolved entities from selected options |

 * Always included for select menu components

###### Modal Submit Data Structure

| Field | Type | Description |
| --- | --- | --- |
| custom_id | string | Modal `custom_id` supplied by the developer |
| components | array of component interaction response | Values submitted by the user |
| resolved? | resolved data | Resolved entities from selected options |

###### Component Interaction Response Structures

 Structures used when responding to modal interactions and message component interactions.
| Component |
| --- |
| String Select |
| Text Input |
| User Select |
| Role Select |
| Mentionable Select |
| Channel Select |
| Text Display |
| Label |
| File Upload |
| Radio Group |
| Checkbox Group |
| Checkbox |

###### Resolved Data Structure

 When Member data is present, the matching User data is included as well.
| Field | Type | Description |
| --- | --- | --- |
| users? | Map from Snowflakes to user objects | IDs and User objects |
| members?* | Map from Snowflakes to partial member objects | IDs and partial Member objects |
| roles? | Map from Snowflakes to role objects | IDs and Role objects |
| channels?** | Map from Snowflakes to partial channel objects | IDs and partial Channel objects |
| messages? | Map from Snowflakes to partial message objects | IDs and partial Message objects |
| attachments? | Map from Snowflakes to attachment objects | IDs and attachment objects |

 * Partial `Member` objects omit `user`, `deaf`, and `mute` ** Partial `Channel` objects contain only `id`, `name`, `type`, `permissions`, `last_message_id`, `last_pin_timestamp`, `nsfw`, `parent_id`, `guild_id`, `flags`, `rate_limit_per_user`, `topic`, and `position`. Threads also include `thread_metadata`.

###### Application Command Interaction Data Option Structure

 Each option has a name. An option is either a parameter with an input value, which sets `value`, or a subcommand/subcommand group, which contains a top-level key plus an `options` array. `value` and `options` do not appear together.
| Field | Type | Description |
| --- | --- | --- |
| name | string | Name of the parameter |
| type | integer | Application command option type value |
| value? | string, integer, double, or boolean | Option value supplied by user input |
| options? | array of application command interaction data option | Included when this option represents a group or subcommand |
| focused? | boolean | `true` when this option is currently focused for autocomplete |


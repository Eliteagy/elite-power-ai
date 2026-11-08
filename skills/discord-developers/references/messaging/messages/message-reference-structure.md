# Message reference structure
Context: Discord developer reference: Message reference structure
[Source](message-objects-and-embeds-index.md) / [Previous source section](message-call-object.md) / [Following source section](message-reference-types.md)
<a id="source-message-reference-object"></a> <a id="source-message-reference-structure"></a>

### Message Reference Object

#### Message Reference Structure

| Field | Type | Description |
| --- | --- | --- |
| type? * | integer | type of reference. |
| message_id? | snowflake | id of the originating message |
| channel_id? ** | snowflake | id of the originating message's channel |
| guild_id? | snowflake | id of the originating message's guild |
| fail_if_not_exists? | boolean | when sending, whether to return an error if the referenced message is missing instead of sending a normal non-reply message; default true |

 * If `type` is omitted, treat it as `DEFAULT` to preserve behavior from before message references had types. Future API versions will require this field. `channel_id` is optional when creating a reply, but it is always present in received events or responses that include this model. **Required for forwards.**


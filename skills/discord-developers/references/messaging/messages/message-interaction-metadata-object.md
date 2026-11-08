# Message interaction metadata object
Context: Discord developer reference: Message interaction metadata object
[Source](message-objects-and-embeds-index.md) / [Previous source section](example-crossposted-message.md) / [Following source section](message-call-object.md)
<a id="source-message-interaction-metadata-object"></a> <a id="source-application-command-interaction-metadata-structure"></a> <a id="source-message-component-interaction-metadata-structure"></a> <a id="source-modal-submit-interaction-metadata-structure"></a>

### Message Interaction Metadata Object

 Interaction metadata records the interaction source plus relevant server and user IDs. It is one of [Application Command Interaction Metadata](https://docs.discord.com/developers/resources/message#message-interaction-metadata-object-application-command-interaction-metadata-structure), [Message Component Interaction Metadata](https://docs.discord.com/developers/resources/message#message-interaction-metadata-object-message-component-interaction-metadata-structure), or [Modal Submit Interaction Metadata](https://docs.discord.com/developers/resources/message#message-interaction-metadata-object-modal-submit-interaction-metadata-structure).

###### Application Command Interaction Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the interaction |
| type | interaction type | Type of interaction |
| user | user object | User who triggered the interaction |
| authorizing_integration_owners | dictionary keyed by application integration types | installation context IDs for an interaction; details are in Authorizing Integration Owners Object |
| original_response_message_id? | snowflake | original response message ID, present only on follow-up messages |
| target_user? | user object | user targeted by the command, present only for user command interactions |
| target_message_id? | snowflake | message ID targeted by the command, present only for message command interactions. The original response message also has `message_reference` and `referenced_message` pointing to that message. |

###### Message Component Interaction Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the interaction |
| type | interaction type | Type of interaction |
| user | user object | User who triggered the interaction |
| authorizing_integration_owners | dictionary keyed by application integration types | installation context IDs for an interaction; details are in Authorizing Integration Owners Object |
| original_response_message_id? | snowflake | original response message ID, present only on follow-up messages |
| interacted_message_id | snowflake | ID of the message that held the interactive component |

###### Modal Submit Interaction Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the interaction |
| type | interaction type | Type of interaction |
| user | user object | User who triggered the interaction |
| authorizing_integration_owners | dictionary keyed by application integration types | installation context IDs for an interaction; details are in Authorizing Integration Owners Object |
| original_response_message_id? | snowflake | original response message ID, present only on follow-up messages |
| triggering_interaction_metadata | Application Command Interaction Metadata object or Message Component Interaction Metadata object | metadata for the interaction that opened the modal |


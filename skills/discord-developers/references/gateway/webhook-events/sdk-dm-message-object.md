# SDK dm message object
Context: Discord developer reference: SDK dm message object
[Source](webhook-events-index.md) / [Previous source section](message-object.md)
<a id="source-sdk-dm-message-object"></a> <a id="source-sdk-dm-message-structure"></a>

### SDK DM Message Object

 Represents an in-game-only message between provisional users.

###### SDK DM Message Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the message |
| type | integer | Type of message |
| content | string | Contents of the message |
| author | user object | Author of the message |
| flags | integer | Message flags represented as a bitfield |
| application_id | snowflake | ID of the application that created the message |
| channel | channel object | Channel object with recipient information |
| activity? | message activity object | Included with Rich Presence-related chat embeds |
| application? | partial application object | Included with Rich Presence-related chat embeds |

 When both direct-message participants are provisional accounts, the messages are "SDK DM messages" that only appear in-game and follow this specialized structure.

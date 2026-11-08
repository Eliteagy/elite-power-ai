# Message interaction object
Context: Discord developer reference: Message interaction object
[Source](interaction-objects-and-responses-index.md) / [Previous source section](application-command-data-structure.md) / [Following source section](receiving-an-interaction.md)
<a id="source-message-interaction-object"></a> <a id="source-message-interaction-structure"></a>

### Message Interaction Object

 This appears on a [message object](https://docs.discord.com/developers/resources/message#message-object) when the message responds to an Interaction that did not already have a message. Responses to [Message Components](https://docs.discord.com/developers/components/reference) do not include it, because components always belong to existing messages and instead use a [message reference](https://docs.discord.com/developers/resources/message#message-reference-structure) object.

###### Message Interaction Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the interaction |
| type | interaction type | Type of interaction |
| name | string | Application command name, including any subcommands and subcommand groups |
| user | user object | User who invoked the interaction |
| member? | partial member object | Guild member that invoked the interaction |


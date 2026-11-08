# Lobby object
Context: Discord developer reference: Lobby object
[Source](../invites-and-lobbies-index.md) / [Previous source section](../invites/get-target-users-job-status.md) / [Following source section](lobby-member-object.md)
<a id="source-lobby-object"></a> <a id="source-lobby-object-1"></a> <a id="source-lobby-structure"></a>

## Lobby Object

### Lobby Object

 Represents a Discord lobby. See [Managing Lobbies](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-lobbies) for details.

###### Lobby Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of this channel |
| application_id | snowflake | application that created the lobby |
| metadata | ?dict<string, string> | string key/value dictionary; maximum combined length 1000. |
| members | array of lobby member objects | members of the lobby |
| linked_channel? | channel object | guild channel connected to the lobby |


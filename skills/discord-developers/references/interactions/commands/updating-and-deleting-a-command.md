# Updating and deleting a command
Context: Discord developer reference: Updating and deleting a command
[Source](command-definitions-and-registration-index.md) / [Previous source section](making-a-guild-command.md) / [Following source section](contexts.md)
<a id="source-updating-and-deleting-a-command"></a>

### Updating and Deleting a Command

 Update and delete commands with `PATCH` and `DELETE` calls to the command endpoint. The endpoints are:
- `applications/<my_application_id>/commands/<command_id>` for global commands, or
- `applications/<my_application_id>/guilds/<guild_id>/commands/<command_id>` for guild commands
 Because command names are unique within type and scope, `POST` requests for new commands are treated as upserts. **Creating a command with a name already used by your application updates the existing command**. Endpoint and parameter details are in [the endpoints section](https://docs.discord.com/developers/interactions/application-commands#endpoints).


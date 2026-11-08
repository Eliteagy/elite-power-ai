# Customizing the default entry point command
Context: Discord developer reference: Customizing the default entry point command
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](setting-up-an-entry-point-command.md) / [Following source section](creating-an-entry-point-command.md)
<a id="source-customizing-the-default-entry-point-command"></a>

#### Customizing the Default Entry Point Command

 Entry Point commands use the same customization model as other [commands](https://docs.discord.com/developers/interactions/application-commands). They can only be [global](https://docs.discord.com/developers/interactions/application-commands#making-a-global-command), so use the global command HTTP endpoints:
- **Change the name or details of the current Entry Point command** with the [Edit Global Application Command](https://docs.discord.com/developers/interactions/application-commands#edit-global-application-command) endpoint. If the Entry Point command ID is unknown, retrieve it with [Get Global Application Commands](https://docs.discord.com/developers/interactions/application-commands#get-global-application-commands).
- **Promote another command without options to be the Entry Point command** by setting its [command `type`](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-types) to `PRIMARY_ENTRY_POINT` (type `4`). An app may have only one Entry Point command, so remove the existing one with [delete](https://docs.discord.com/developers/interactions/application-commands#delete-global-application-command) or change its [command `type`](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-types) through [update](https://docs.discord.com/developers/interactions/application-commands#edit-global-application-command) first.


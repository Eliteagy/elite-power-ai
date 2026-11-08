# Sync guild template
Context: Discord developer reference: Sync guild template
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-template-object.md) / [Previous source section](create-guild-template.md) / [Following source section](modify-guild-template.md)
<a id="source-sync-guild-template"></a>

### Sync Guild Template

 PUT/guilds/[{guild.id}](https://docs.discord.com/developers/resources/guild#guild-object)/templates/[{template.code}](https://docs.discord.com/developers/resources/guild-template#guild-template-object) syncs the template with the guild's current state. Requires the `MANAGE_GUILD` permission and returns the [guild template](https://docs.discord.com/developers/resources/guild-template#guild-template-object) object on success.


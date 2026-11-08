# Delete guild template
Context: Discord developer reference: Delete guild template
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-template-object.md) / [Previous source section](modify-guild-template.md)
<a id="source-delete-guild-template"></a>

### Delete Guild Template

 DELETE/guilds/[{guild.id}](https://docs.discord.com/developers/resources/guild#guild-object)/templates/[{template.code}](https://docs.discord.com/developers/resources/guild-template#guild-template-object) deletes the template. Requires the `MANAGE_GUILD` permission and returns the deleted [guild template](https://docs.discord.com/developers/resources/guild-template#guild-template-object) object on success.

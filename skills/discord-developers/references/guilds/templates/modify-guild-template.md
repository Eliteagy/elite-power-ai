# Modify guild template
Context: Discord developer reference: Modify guild template
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-template-object.md) / [Previous source section](sync-guild-template.md) / [Following source section](delete-guild-template.md)
<a id="source-modify-guild-template"></a> <a id="source-json-params-3"></a>

### Modify Guild Template

 PATCH/guilds/[{guild.id}](https://docs.discord.com/developers/resources/guild#guild-object)/templates/[{template.code}](https://docs.discord.com/developers/resources/guild-template#guild-template-object) changes the template's metadata. Requires the `MANAGE_GUILD` permission and returns the [guild template](https://docs.discord.com/developers/resources/guild-template#guild-template-object) object on success.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name? | string | name of the template (1-100 characters) |
| description? | ?string | description for the template (0-120 characters) |


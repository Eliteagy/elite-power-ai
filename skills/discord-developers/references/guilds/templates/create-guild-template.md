# Create guild template
Context: Discord developer reference: Create guild template
[Source](../../resources/scheduled-events-and-templates-index.md) / [Owning endpoint, event, object or procedure conditions](guild-template-object.md) / [Previous source section](get-guild-templates.md) / [Following source section](sync-guild-template.md)
<a id="source-create-guild-template"></a> <a id="source-json-params-2"></a>

### Create Guild Template

 POST/guilds/[{guild.id}](https://docs.discord.com/developers/resources/guild#guild-object)/templates creates a template for the guild. Requires the `MANAGE_GUILD` permission and returns the created [guild template](https://docs.discord.com/developers/resources/guild-template#guild-template-object) object on success.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the template (1-100 characters) |
| description? | ?string | description for the template (0-120 characters) |


# Gradient Roles and Guild Tags

Date: 2025-07-02
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1948) · [Year index](INDEX.md)

<a id="source-gradient-roles-and-guild-tags"></a>


Gradient role colors and guild tags are now documented for the API. Guild tags let users show a favorite server with a 1-4 character badge beside their display name, available through the `primary_guild` field on the user object. Servers are no longer limited to one flat role color; they can configure gradients through the new `colors` field on the role object. The role `color` field is deprecated by this change, but it continues to work for backwards compatibility.

<a id="source-gradient-role-colors"></a>

#### Gradient Role Colors

- The guild feature `ENHANCED_ROLE_COLORS` indicates whether a guild can assign gradient colors to roles.
- Guild roles now include `colors` in their [structure](https://docs.discord.com/developers/topics/permissions#role-object-role-structure).
- `color` on guild roles is deprecated, but the API still returns it and it remains supported for backwards compatibility.
- [Role color structure](https://docs.discord.com/developers/topics/permissions#role-object-role-colors-object)

<a id="source-guild-tags"></a>

#### Guild Tags

- Retrieve guild tags from the `primary_guild` field on the user object.
- [User Primary Guild](https://docs.discord.com/developers/resources/user#user-object-user-primary-guild)

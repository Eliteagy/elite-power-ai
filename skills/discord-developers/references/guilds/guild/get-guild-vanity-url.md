# Get guild vanity url
Context: Discord developer reference: Get guild vanity url
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-widget.md) / [Following source section](get-guild-widget-image.md)
<a id="source-get-guild-vanity-url"></a> <a id="source-example-partial-invite-object"></a>

### Get Guild Vanity URL

  Return a partial [invite](https://docs.discord.com/developers/resources/invite#invite-object) object for guilds where the vanity URL feature is enabled. `MANAGE_GUILD` is required. If the guild has no configured vanity url, `code` is null. Use this endpoint for the vanity invite usage count; the invite code itself is available as `vanity_url_code` on the [guild object](https://docs.discord.com/developers/resources/guild#guild-object) without requiring `MANAGE_GUILD`.

###### Example Partial Invite Object

```
{
  "code": "abc",
  "uses": 12
}

```


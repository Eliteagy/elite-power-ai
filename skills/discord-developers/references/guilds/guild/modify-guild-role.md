# Modify guild role
Context: Discord developer reference: Modify guild role
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](modify-guild-role-positions-json-params.md) / [Following source section](delete-guild-role.md)
<a id="source-modify-guild-role"></a> <a id="source-json-params-1"></a>

### Modify Guild Role

  Update a guild role. The request requires `MANAGE_ROLES`, returns the modified [role](https://docs.discord.com/developers/topics/permissions#role-object), and emits a [Guild Role Update](https://docs.discord.com/developers/events/gateway-events#guild-role-update) Gateway event. Each endpoint parameter is optional and nullable. `X-Audit-Log-Reason` is supported.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | role name, limited to 100 characters |
| permissions | string | bitfield representing permissions that are enabled or disabled |
| color* | integer | **Deprecated** RGB color value |
| colors | role colors object | the role’s colors |
| hoist | boolean | whether this role appears in its own sidebar group |
| icon | image data | role icon image, available only when the guild includes the `ROLE_ICONS` feature |
| unicode_emoji | string | standard emoji used as the role unicode emoji, available only when the guild includes the `ROLE_ICONS` feature |
| mentionable | boolean | whether users can mention this role |

 * The API continues to include `color`, but requests should prefer the `colors` field.


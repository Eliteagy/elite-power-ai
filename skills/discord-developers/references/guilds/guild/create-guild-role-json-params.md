# Create guild role JSON params
Context: Discord developer reference: Create guild role JSON params
[Source](guild-members-and-ban-endpoints-index.md) / [Source](roles-pruning-and-guild-settings-index.md) / [Owning endpoint, event, object or procedure conditions](create-guild-role.md) / [Previous source section](modify-guild-role-positions.md)
<a id="source-json-params-9"></a>

###### JSON Params
| Field | Type | Description | Default |
| --- | --- | --- | --- |
| name | string | role name, limited to 100 characters | ”new role” |
| permissions | string | bitfield representing permissions that are enabled or disabled | @everyone permissions in guild |
| color* | integer | **Deprecated** RGB color value | 0 |
| colors | role colors object | the role’s colors | default role colors object |
| hoist | boolean | whether this role appears in its own sidebar group | false |
| icon | ?image data | role icon image, available only when the guild includes the `ROLE_ICONS` feature | null |
| unicode_emoji | ?string | standard emoji used as the role unicode emoji, available only when the guild includes the `ROLE_ICONS` feature | null |
| mentionable | boolean | whether users can mention this role | false |

 * The API continues to include `color`, but requests should prefer the `colors` field.


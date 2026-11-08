# Role object
Context: Discord developer reference: Role object
[Source](permissions-index.md) / [Previous source section](permission-syncing.md) / [Following source section](role-object-role-flags.md)
<a id="source-role-object"></a> <a id="source-role-structure"></a> <a id="source-role-tags-structure"></a> <a id="source-role-colors-object"></a> <a id="source-default-role-colors-object"></a> <a id="source-example-role"></a>

### Role Object

Roles are named permission bundles assigned to groups of users. They can carry colors, appear separately in the sidebar when pinned, and hold different permission settings for the guild context and channel context. The `@everyone` role uses the same ID as its guild.

###### Role Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | role id |
| name | string | role name |
| color* | integer | **Deprecated** integer form of the hexadecimal color code |
| colors | role colors object | colors assigned to the role |
| hoist | boolean | whether this role is pinned in the user list |
| icon? | ?string | role icon hash |
| unicode_emoji? | ?string | role unicode emoji |
| position | integer | role position; roles sharing a position are ordered by id |
| permissions | string | permission bit set |
| managed | boolean | whether an integration manages this role |
| mentionable | boolean | whether users can mention this role |
| tags? | role tags object | tags attached to this role |
| flags | integer | role flags represented as a bitfield |

Roles with no colors (`colors.primary_color == 0`) are ignored when Discord computes the final user-list color. * `color` is still returned by the API, but requests should use the `colors` field.

###### Role Tags Structure

Tags whose type is `null` behave as booleans. They are present with value `null` when true, and omitted when false.
| Field | Type | Description |
| --- | --- | --- |
| bot_id? | snowflake | id of the bot this role belongs to |
| integration_id? | snowflake | id of the integration this role belongs to |
| premium_subscriber? | null | whether this is the guild's Booster role |
| subscription_listing_id? | snowflake | id of this role's subscription sku and listing |
| available_for_purchase? | null | whether this role is available for purchase |
| guild_connections? | null | whether this is the guild's linked role |

###### Role Colors Object

The object always includes `primary_color`, matching the role's `color`. The other fields may be non-null only when the guild has the `ENHANCED_ROLE_COLORS` [guild feature](https://docs.discord.com/developers/resources/guild#guild-object-guild-features).
| Field | Type | Description |
| --- | --- | --- |
| primary_color | integer | primary role color |
| secondary_color | ?integer | secondary role color used with other supplied colors to make a gradient |
| tertiary_color | ?integer | tertiary role color that changes the gradient to a holographic style |

When sending `tertiary_color`, the API forces the role color into a holographic style with these values: `primary_color = 11127295`, `secondary_color = 16759788`, and `tertiary_color = 16761760`.

###### Default Role Colors Object

```
"colors": {
  "primary_color": 0,
  "secondary_color": null,
  "tertiary_color": null
}

```

###### Example Role

```
{
  "id": "41771983423143936",
  "name": "WE DEM BOYZZ!!!!!!",
  "color": 3447003,
  "colors": {
    "primary_color": 3447003,
    "secondary_color": null,
    "tertiary_color": null
  },
  "hoist": true,
  "icon": "cf3ced8600b777c9486c6d8d84fb4327",
  "unicode_emoji": null,
  "position": 1,
  "permissions": "66321471",
  "managed": false,
  "mentionable": false,
  "flags": 0
}

```


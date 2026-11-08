# Emoji object emoji structure
Context: Discord developer reference: Emoji object emoji structure
[Source](../emoji-and-entitlements-index.md) / [Owning endpoint, event, object or procedure conditions](emoji-object.md) / [Following source section](list-guild-emojis.md)
<a id="source-emoji-object-1"></a> <a id="source-emoji-structure"></a> <a id="source-premium-emoji"></a> <a id="source-emoji-formats"></a> <a id="source-application-owned-emoji"></a> <a id="source-emoji-example"></a> <a id="source-standard-emoji-example"></a> <a id="source-custom-emoji-examples"></a>

### Emoji Object

###### Emoji Structure

| Field | Type | Description |
| --- | --- | --- |
| id | ?snowflake | emoji id |
| name | ?string (null is allowed only for reaction emoji objects). | emoji name |
| roles? | array of role object ids | roles that may use this emoji. |
| user? | user object | user that created this emoji |
| require_colons? | boolean | whether this emoji requires surrounding colons. |
| managed? | boolean | whether this emoji is managed |
| animated? | boolean | whether this emoji is animated |
| available? | boolean | whether this emoji is usable; this can be false after Server Boosts are lost. |

###### Premium Emoji

 Roles whose `integration_id` tag is the guild's guild_subscription integration count as subscription roles. One emoji cannot mix subscription roles with non-subscription roles. Emoji assigned to subscription roles are premium emoji and use a separate limit of 25. Once created, an emoji cannot be changed between normal and premium.

###### Emoji Formats

 Emoji uploads may use JPEG, PNG, GIF, WebP, or AVIF. Regardless of upload format, emoji can be served as WebP. Discord strongly recommends fetching emoji with the `.webp` extension for best performance and compatibility, matching the Discord client, which displays all in-app emoji as WebP. Still WebP emoji use the `.webp` extension. Animated WebP emoji also use `.webp` with the `?animated=true` query parameter.

###### Application-Owned Emoji

 An application may own as many as 2000 emojis that are usable only by that app. App emojis can be administered through the API with a bot token or through the application's portal settings. Using app emojis does not require `USE_EXTERNAL_EMOJIS`. For an app emoji object, the `user` field is the team member who uploaded it through settings, or the bot user when it was uploaded through the API.

###### Emoji Example

```
{
  "id": "41771983429993937",
  "name": "LUL",
  "roles": ["41771983429993000", "41771983429993111"],
  "user": {
    "username": "Luigi",
    "discriminator": "0002",
    "id": "96008815106887111",
    "avatar": "5500909a3274e1812beb4e8de6631111",
    "public_flags": 131328
  },
  "require_colons": true,
  "managed": false,
  "animated": false
}

```

###### Standard Emoji Example

```
{
  "id": null,
  "name": "🔥"
}

```

###### Custom Emoji Examples

 `MESSAGE_REACTION_ADD`, `MESSAGE_REACTION_REMOVE`, and `MESSAGE_REACTION_REMOVE_EMOJI` gateway events include `animated` for animated emoji. In `MESSAGE_REACTION_ADD` and `MESSAGE_REACTION_REMOVE`, `name` can be `null` when custom emoji data cannot be retrieved, such as after the emoji was deleted from the guild.

```
{
  "id": "41771983429993937",
  "name": "LUL",
  "animated": true
}

```

```
{
  "id": "41771983429993937",
  "name": null
}

```


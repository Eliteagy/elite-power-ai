# User object user structure
Context: Discord developer reference: User object user structure
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames.md) / [Following source section](user-object-premium-types.md)
<a id="source-user-object"></a> <a id="source-user-structure"></a> <a id="source-example-user"></a> <a id="source-user-flags"></a>

### User Object

###### User Structure

| Field | Type | Description | Required OAuth2 Scope |
| --- | --- | --- | --- |
| id | snowflake | the user’s id | identify |
| username | string | the user's username; this value is not unique across the platform | identify |
| discriminator | string | the user’s Discord-tag | identify |
| global_name | ?string | the user's display name when one is configured | identify |
| avatar | ?string | the user’s avatar hash | identify |
| bot? | boolean | whether an OAuth2 application owns this user | identify |
| system? | boolean | whether the user is an Official Discord System user, used by the urgent message system | identify |
| mfa_enabled? | boolean | whether two factor authentication is enabled on the user's account | identify |
| banner? | ?string | the user’s banner hash | identify |
| accent_color? | ?integer | the user's banner color as an integer form of a hexadecimal color code | identify |
| locale? | string | the user's selected language option | identify |
| verified? | boolean | whether the account email has been verified | email |
| email? | ?string | the user’s email | email |
| flags? | integer | the flags attached to the user's account | identify |
| premium_type? | integer | the Nitro subscription type on the user's account | identify.premium |
| public_flags? | integer | the public flags exposed for the user's account | identify |
| avatar_decoration_data? | ?avatar decoration data object | avatar decoration data for the user | identify |
| collectibles? | ?collectibles object | collectibles data for the user | identify |
| primary_guild? | ?user primary guild object | the user’s primary guild | identify |

###### Example User

```
{
  "id": "80351110224678912",
  "username": "Nelly",
  "global_name": null,
  "discriminator": "1337",
  "avatar": "8342729096ea3675442027381ff50dfe",
  "verified": true,
  "email": "nelly@discord.com",
  "flags": 64,
  "banner": "06c16474723fe537c283b8efa61a30c8",
  "accent_color": 16711680,
  "premium_type": 0,
  "public_flags": 64,
  "avatar_decoration_data": {
    "sku_id": "1144058844004233369",
    "asset": "a_fed43ab12698df65902ba06727e20c0e"
  },
  "collectibles": {
    "nameplate": {
      "sku_id": "2247558840304243311",
      "asset": "nameplates/nameplates/twilight/",
      "label": "",
      "palette": "cobalt"
    }
  },
  "primary_guild": {
    "identity_guild_id": "1234647491267808778",
    "identity_enabled": true,
    "tag": "DISC",
    "badge": "7d1734ae5a615e82bc7a4033b98fade8"
  }
}

```

###### User Flags

| Value | Name | Description |
| --- | --- | --- |
| `1 << 0` | STAFF | Discord Employee |
| `1 << 1` | PARTNER | Partnered Server Owner |
| `1 << 2` | HYPESQUAD | HypeSquad Events Member |
| `1 << 3` | BUG_HUNTER_LEVEL_1 | Bug Hunter Level 1 |
| `1 << 6` | HYPESQUAD_ONLINE_HOUSE_1 | House Bravery Member |
| `1 << 7` | HYPESQUAD_ONLINE_HOUSE_2 | House Brilliance Member |
| `1 << 8` | HYPESQUAD_ONLINE_HOUSE_3 | House Balance Member |
| `1 << 9` | PREMIUM_EARLY_SUPPORTER | Early Nitro Supporter |
| `1 << 10` | TEAM_PSEUDO_USER | User is a team |
| `1 << 14` | BUG_HUNTER_LEVEL_2 | Bug Hunter Level 2 |
| `1 << 16` | VERIFIED_BOT | Verified Bot |
| `1 << 17` | VERIFIED_DEVELOPER | Early Verified Bot Developer |
| `1 << 18` | CERTIFIED_MODERATOR | Moderator Programs Alumni |
| `1 << 19` | BOT_HTTP_INTERACTIONS | Bot communicates only through HTTP interactions and appears in the online member list |


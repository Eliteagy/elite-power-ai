# Unique usernames on Discord

Date: 2023-05-03
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3261) · [Year index](INDEX.md)

<a id="source-unique-usernames-on-discord"></a>


Bot users remain on the legacy username system for now; see the [Developer Help Center article](https://dis.gd/app-usernames). Discord's username system is changing: discriminators are being removed, and unique usernames plus display names are being introduced. The [general Help Center article](https://dis.gd/usernames) explains the impact for non-bot users, while the [Developer Help Center article](https://dis.gd/app-usernames) explains bot-user impact. This changelog covers only technical app-code changes.

<a id="source-identifying-migrated-users"></a>

### Identifying migrated users

The new username system rolls out to users gradually. A user has migrated when the [`discriminator` field](https://docs.discord.com/developers/resources/user#user-object-user-structure) is exactly `"0"`. Migrated users do *not* use a 4-digits discriminator (`"0"` is not `"0000"`). The `username` field becomes the migrated user's unique username. After all users migrate, `discriminator` may be removed.

<a id="source-example-migrated-user"></a>

#### Example migrated user

```
{
  "id": "80351110224678912",
  "username": "nelly",
  "discriminator": "0",
  "global_name": "Nelly",
  "avatar": "8342729096ea3675442027381ff50dfe",
  "verified": true,
  "email": "nelly@discord.com",
  "flags": 64,
  "banner": "06c16474723fe537c283b8efa61a30c8",
  "accent_color": 16711680,
  "premium_type": 1,
  "public_flags": 64
}

```

<a id="source-display-names"></a>

### Display names

Under the new username system, standard Discord users can set a non-unique display name. This is exposed as `global_name`, with a max length of 32 characters. If no display name is set, `global_name` is null.

<a id="source-default-avatars"></a>

### Default avatars

For migrated accounts, default avatar URLs are based on user ID instead of discriminator. Calculate the URL with `(user_id >> 22) % 6`. Legacy username accounts continue to use `discriminator % 5`.

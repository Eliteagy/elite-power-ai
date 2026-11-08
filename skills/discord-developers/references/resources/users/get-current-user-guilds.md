# Get current user guilds
Context: Discord developer reference: Get current user guilds
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](modify-current-user.md) / [Following source section](get-current-user-guild-member.md)
<a id="source-get-current-user-guilds"></a> <a id="source-example-partial-guild"></a> <a id="source-query-string-params"></a>

### Get Current User Guilds

  Returns partial [guild](https://docs.discord.com/developers/resources/guild#guild-object) objects for guilds that include the current user. OAuth2 calls require the `guilds` scope.

###### Example Partial Guild

```
{
  "id": "80351110224678912",
  "name": "1337 Krew",
  "icon": "8342729096ea3675442027381ff50dfe",
  "banner": "bb42bdc37653b7cf58c4c8cc622e76cb",
  "owner": true,
  "permissions": "36953089",
  "features": ["COMMUNITY", "NEWS", "ANIMATED_ICON", "INVITE_SPLASH", "BANNER", "ROLE_ICONS"],
  "approximate_member_count": 3268,
  "approximate_presence_count": 784
}

```

 By default this endpoint returns 200 guilds, matching the maximum number of guilds a non-bot user can join. Integrations that only need the user's guild list do **not need** pagination.

###### Query String Params

| Field | Type | Description | Required | Default |
| --- | --- | --- | --- | --- |
| before | snowflake | return guilds before this guild ID | false | absent |
| after | snowflake | return guilds after this guild ID | false | absent |
| limit | integer | maximum number of guilds to return (1-200) | false | 200 |
| with_counts | boolean | include approximate member and presence counts in the response | false | false |


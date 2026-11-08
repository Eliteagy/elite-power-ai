# User object premium types
Context: Discord developer reference: User object premium types
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Owning endpoint, event, object or procedure conditions](user-object-user-structure.md) / [Following source section](avatar-decoration-data-object.md)
<a id="source-premium-types"></a> <a id="source-user-primary-guild"></a>

###### Premium Types

 Premium types identify a user's premium level. See the [Nitro](https://discord.com/nitro) page for the current premium plans.
| Value | Name |
| --- | --- |
| 0 | None |
| 1 | Nitro Classic |
| 2 | Nitro |
| 3 | Nitro Basic |

###### User Primary Guild

| Field | Type | Description |
| --- | --- | --- |
| identity_guild_id | ?snowflake | the id of the user's primary guild |
| identity_enabled | ?boolean | whether the user is showing the primary guild's server tag. The value can be `null` when the system clears the identity, for example if the server stops supporting tags. It is `false` when the user manually removes the tag. |
| tag | ?string | the user's server tag text, limited to 4 characters |
| badge | ?string | the server tag badge hash |


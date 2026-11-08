# Permissions
Context: Discord developer reference: Permissions
[Source](permissions-index.md) / [Following source section](bitwise-permission-flags.md)
<a id="source-permissions"></a>

# Permissions

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Discord permissions define which actions a user can perform. Role permissions start at the guild level: roles are configured with base capabilities, then assigned to users to grant or withhold privileges. Discord also supports per-channel permission overwrites for roles and individual members. [Application command permissions](https://docs.discord.com/developers/interactions/application-commands#permissions) can enable or disable commands for channels, roles, or users. The permission set is a variable-length integer, serialized as a string and evaluated with bitwise math. A permission value such as `123` is serialized as `"123"`. For durable implementations, deserialize permission strings with the Big Integer support in your language. Combine individual flags with OR (`|`), and test individual flags with AND (`&`). Starting with API v8, every permission value is serialized as a string, including overwrite fields such as `allow` and `deny`; new permission bits are folded into the base field. In [API v6 (now deprecated)](https://docs.discord.com/developers/reference), role and overwrite fields named `permissions`, `allow`, and `deny` are still numbers, but they will not exceed 31 bits. During the rest of API v6, new bits appear only in `permissions_new`, `allow_new`, and `deny_new`. Those `_new` fields exist for response serialization only; requests still use `permissions`, `allow`, and `deny`, accepting either string or number values.

```
# Permissions value that can Send Messages (0x800) and Add Reactions (0x40):
permissions = 0x40 | 0x800 # 2112

# Checking for flags that are set:
(permissions & 0x40) == 0x40   # True
(permissions & 0x800) == 0x800 # True

# Kick Members (0x2) was not set:
(permissions & 0x2) == 0x2 # False

```

Permission overwrites add more rules, covered later in this reference. For background on bit fields and bitwise flag handling, see [this page](https://en.wikipedia.org/wiki/Bit_field). The table below lists current permission flags, their hexadecimal values, their granted privilege, and the channel categories where they apply.


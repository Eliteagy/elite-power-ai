# Permission hierarchy
Context: Discord developer reference: Permission hierarchy
[Source](permissions-index.md) / [Previous source section](bitwise-permission-flags.md) / [Following source section](permission-overwrites.md)
<a id="source-permission-hierarchy"></a>

### Permission Hierarchy

Permission results can look simple until role position restrictions matter. Bots cannot perform some actions against targets whose highest role is too high relative to the bot's highest role. A user's or bot's highest role is the assigned role with the largest position value in the guild; the default @everyone role has position 0. These hierarchy rules apply:
- A bot can grant roles only when those roles sit below its own highest role.
- A bot can edit lower roles, and can grant only permissions the bot already has.
- A bot can reorder only roles below its highest role.
- A bot can kick, ban, or edit nicknames only for users whose highest role is below the bot's highest role.
Outside those cases, role order does not resolve permission conflicts. For example, a user may have role A denying `VIEW_CHANNEL` on #coolstuff and role B allowing `VIEW_CHANNEL` on #coolstuff. The user can view #coolstuff regardless of whether role A or role B has the higher position.


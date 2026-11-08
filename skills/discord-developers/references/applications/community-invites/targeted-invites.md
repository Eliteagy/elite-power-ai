# Targeted invites
Context: Discord developer reference: Targeted invites
[Source](using-community-invites-index.md) / [Previous source section](role-assignment.md) / [Following source section](role-granting-invite-example-auto-assigning-player-roles.md)
<a id="source-targeted-invites"></a>

### Targeted Invites

 Restricting who may accept an invite is available only through the Discord API. The `target_users_file` parameter is a CSV file of Discord user IDs; only listed users can view and use the invite. **Example use cases:**
- Stopping invite sharing for exclusive achievements, such as a unique invite that grants a 100% completion role
- Pairing the restriction with roles that grant mod/admin privileges
- Pairing the restriction with roles that give paying supporters special roles or channel access
 These capabilities still work alongside normal invite settings such as `max_age`, `max_uses`, and related parameters.

---


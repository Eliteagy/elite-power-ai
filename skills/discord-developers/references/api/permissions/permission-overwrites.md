# Permission overwrites
Context: Discord developer reference: Permission overwrites
[Source](permissions-index.md) / [Previous source section](permission-hierarchy.md) / [Following source section](implicit-permissions.md)
<a id="source-permission-overwrites"></a>

### Permission Overwrites

Overwrites apply selected permissions to roles or members at the channel level. The flag table marks channel support with **T** for text, **V** for voice, and **S** for stage. A user can receive conflicting instructions from guild roles, @everyone channel overwrites, role overwrites, and member overwrites. Discord resolves those inputs in this order:
1. Guild-level base permissions from @everyone are applied
2. Guild-level permissions from the member's roles are added
3. Channel-level @everyone denies are applied
4. Channel-level @everyone allows are applied
5. Channel-level denies for specific roles are applied
6. Channel-level allows for specific roles are applied
7. Channel-level member-specific denies are applied
8. Channel-level member-specific allows are applied
The following pseudocode shows the same order:

```
def compute_base_permissions(member, guild):
    if guild.is_owner(member):
        return ALL

    role_everyone = guild.get_role(guild.id)  # get @everyone role
    permissions = role_everyone.permissions

    for role in member.roles:
        permissions |= role.permissions

    if permissions & ADMINISTRATOR == ADMINISTRATOR:
        return ALL

    return permissions

def compute_overwrites(base_permissions, member, channel):
    # ADMINISTRATOR overrides any potential permission overwrites, so there is nothing to do here.
    if base_permissions & ADMINISTRATOR == ADMINISTRATOR:
        return ALL

    permissions = base_permissions
    overwrite_everyone = overwrites.get(channel.guild_id)  # Find (@everyone) role overwrite and apply it.
    if overwrite_everyone:
        permissions &= ~overwrite_everyone.deny
        permissions |= overwrite_everyone.allow

    # Apply role specific overwrites.
    overwrites = channel.permission_overwrites
    allow = NONE
    deny = NONE
    for role_id in member.roles:
        overwrite_role = overwrites.get(role_id)
        if overwrite_role:
            allow |= overwrite_role.allow
            deny |= overwrite_role.deny

    permissions &= ~deny
    permissions |= allow

    # Apply member specific overwrite if it exist.
    overwrite_member = overwrites.get(member.user_id)
    if overwrite_member:
        permissions &= ~overwrite_member.deny
        permissions |= overwrite_member.allow

    return permissions

def compute_permissions(member, channel):
    base_permissions = compute_base_permissions(member, channel.guild)
    return compute_overwrites(base_permissions, member, channel)

```


# Using community invites
Context: Discord developer reference: Using community invites
[Source](using-community-invites-index.md) / [Following source section](understanding-community-invites-features.md)
<a id="source-using-community-invites"></a>

# Using Community Invites

> Discord Developers reference. Original prose; identifiers preserved verbatim.

Community invites add two API-driven capabilities to Discord invites: `role_ids`, which assigns roles when the invite is accepted, and `target_users_file`, which limits acceptance to selected users. Server admins and community managers who want role invites without writing code should use the [Community Invites guide](https://docs.discord.com/developers/communities/guides/community-invites) for the Discord UI flow. This tutorial covers the programmatic approach for bots and apps. After working through it, you will know how to:
- Use the API to create invites that grant roles
- Use the API to create targeted invites for specific user groups

---


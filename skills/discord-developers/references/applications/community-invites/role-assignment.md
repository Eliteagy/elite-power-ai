# Role assignment
Context: Discord developer reference: Role assignment
[Source](using-community-invites-index.md) / [Previous source section](understanding-community-invites-features.md) / [Following source section](targeted-invites.md)
<a id="source-role-assignment"></a>

### Role Assignment

 With the API, `role_ids` can name one or more Discord roles to apply automatically after a player accepts the invite. This removes the need for manual role assignment. **Example use cases:**
- Giving roles to supporters
- Assigning roles tied to in-game characters or achievements
- Assigning roles that unlock permission-gated channels
 After a user accepts the invite and receives roles, those roles stay on the member even if the invite expires or is deleted. Remove them separately with a bot or through Discord's interface.


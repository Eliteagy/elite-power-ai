# Team member roles
Context: Discord developer reference: Team member roles
[Source](teams-index.md) / [Previous source section](transferring-an-app.md) / [Following source section](data-models-team-object.md)
<a id="source-team-member-roles"></a> <a id="source-team-member-role-types"></a>

### Team Member Roles

 A team member has one of four roles: owner, admin, developer, or read-only. Each higher role includes the permissions of the roles below it. Configure member roles from **Team Members** in the team's settings.

###### Team Member Role Types

| Role Name | Value | Description |
| --- | --- | --- |
| Owner* |  | Owners have the broadest permissions and may perform irreversible destructive operations, including deleting team-owned apps or deleting the team. Each team can have only 1 owner. |
| Admin | admin | Admins are granted access close to owners, but destructive operations against the team or its apps are not available to them. |
| Developer | developer | Developers may view team-owned app details, including the client secret and public key, and may perform limited app operations such as setting interaction endpoints or resetting the bot token. A Developer role member *cannot* administer the team, administer members, or perform destructive actions on team-owned apps. |
| Read-only | read_only | Read-only members may view team details and information for team-owned apps, such as application IDs and payout exports. They may also invite private bots that belong to team-owned apps. |

 * The owner role does not appear in the `role` field on the [team member object](https://docs.discord.com/developers/topics/teams#data-models-team-member-object). To determine the team owner, read `owner_user_id` on the [team object](https://docs.discord.com/developers/topics/teams#data-models-team-object).


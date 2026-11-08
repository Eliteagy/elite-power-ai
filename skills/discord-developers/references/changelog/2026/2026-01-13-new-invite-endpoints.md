# New Invite Endpoints

Date: 2026-01-13
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1169) · [Year index](INDEX.md)

<a id="source-new-invite-endpoints"></a>


Discord added endpoints and behavior that let invites grant roles and restrict acceptance to specified users. Communities can use them for finer access control or to assign special roles when members join. [Create Channel Invite](https://docs.discord.com/developers/resources/channel#create-channel-invite) now accepts `target_users_file` and `role_ids` parameters.
- `target_users_file`: CSV file containing the user IDs allowed to accept the invite
- `role_ids`: Role IDs for roles assigned when users accept the invite
Invite endpoints:
- [Get Target Users](https://docs.discord.com/developers/resources/invite#get-target-users): Retrieves users who may view and accept an invite
- [Update Target Users](https://docs.discord.com/developers/resources/invite#update-target-users): Changes the users who may view and accept an invite
- [Get Target Users Job Status](https://docs.discord.com/developers/resources/invite#get-target-users-job-status): Reports the processing job status for target users uploaded from a file

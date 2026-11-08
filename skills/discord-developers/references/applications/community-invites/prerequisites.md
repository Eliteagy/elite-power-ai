# Prerequisites
[Source](using-community-invites-index.md) / [Previous source section](role-granting-invite-example-auto-assigning-player-roles.md) / [Following source section](player-role-invite-example.md)

<a id="source-prerequisites"></a>

### Prerequisites

 Before starting, confirm you have:
- A Discord server for testing
- Developer Mode enabled on your account so role, channel, and user IDs can be copied
- A Discord app with a bot token, created in the [Developer Portal](https://discord.com/developers/applications)
- Node.js installed, or another way for your bot or app to send HTTP requests
- Bot permissions for:
  - **Create Instant Invite** (needed to create invites)
  - **Manage Roles** (needed when `role_ids` automatically assigns roles)

<a id="source-prerequisites-1"></a>

### Prerequisites

 Before starting, confirm you have:
- A Discord server for testing
- Developer Mode enabled on your account so role, channel, and user IDs can be copied
- A Discord app with a bot token, created in the [Developer Portal](https://discord.com/developers/applications)
- Node.js installed, or another way for your bot or app to send HTTP requests
- Bot permissions for:
  - **Create Instant Invite** (needed to create invites)
  - **Manage Guild** (needed for targeted invites that use `target_users_file`)
  - **Manage Roles** (needed when `role_ids` automatically assigns roles)

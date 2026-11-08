# Player role invite example
Context: Discord developer reference: Player role invite example
[Source](using-community-invites-index.md) / [Previous source section](prerequisites.md) / [Following source section](what-s-happening.md)
<a id="source-coding-the-invite"></a>

### Coding the Invite

 When players enter your Discord server from the game, the invite can automatically give them a **Player** role for game-only channels. The following code creates that kind of invite:

```
// IMPORTANT: Never hardcode tokens or commit them to version control
// Use environment variables or a secure configuration management system
// Replace the placeholder below with your actual bot token, channel ID, and role ID
const BOT_TOKEN = 'REPLACE_WITH_YOUR_BOT_TOKEN_FROM_THE_DEV_PORTAL';
const CHANNEL_ID = '1234567890123456789';
const ROLE_ID = '9876543210987654321';

const response = await fetch(
    `https://discord.com/api/v10/channels/${CHANNEL_ID}/invites`,
    {
        method: 'POST',
        headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        role_ids: [ROLE_ID]
        })
    }
);

if (!response.ok) {
const error = await response.json().catch(() => ({
    message: `HTTP ${response.status}`
}));
throw new Error(
    `Failed to create invite: ${error.message}${error.code ? ` (code: ${error.code})` : ''}`
);
}

const invite = await response.json();
console.log(`Created invite: https://discord.gg/${invite.code}`);

```


# Rendering guild specific avatars and nicknames
Context: Discord developer reference: Rendering guild specific avatars and nicknames
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-instance-management.md) / [Owning endpoint, event, object or procedure conditions](render-avatars-and-names.md) / [Following source section](preventing-unwanted-activity-sessions.md)
<a id="source-rendering-guild-specific-avatars-and-nicknames"></a>

#### Rendering guild-specific avatars and nicknames

 To read a user's guild-specific avatar and nickname, request the `guilds.members.read` scope. That scope only grants guild member information for the current application user. If you need to display guild-specific avatars or nicknames for every application user, share data obtained from `guilds.members.read` scoped API calls through your application's server. This example fetches the user's guild-specific avatar and nickname:

```
// We'll be referencing the user object returned from authenticate
const {user} = await discordSdk.commands.authenticate({
  access_token: accessToken,
});

// When using the proxy, you may instead replace `https://discord.com` with `/discord`
// or whatever url mapping you have chosen via the developer portal
fetch(`https://discord.com/api/users/@me/guilds/${discordSdk.guildId}/member`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((guildsMembersRead) => {
    let guildAvatarSrc = '';
    // Retrieve the guild-specific avatar, and fallback to the user's avatar
    if (guildsMembersRead?.avatar) {
      guildAvatarSrc = `https://cdn.discordapp.com/guilds/${discordSdk.guildId}/users/${user.id}/avatars/${guildsMembersRead.avatar}.png?size=256`;
    } else if (user.avatar) {
      guildAvatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    } else {
      const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
      avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }

    // Retrieve the guild-specific nickname, and fallback to the username#discriminator
    const guildNickname = guildsMembersRead?.nick ?? (user.global_name ?? `${user.username}#${user.discriminator}`);
  });

```

 The example performs all work on the client, but a more typical implementation does this instead:
- Store the user's access token on the application server
- Fetch the user's guild-specific avatar and nickname from the application's server
- Serve every application's avatar and nickname through the application's server

---


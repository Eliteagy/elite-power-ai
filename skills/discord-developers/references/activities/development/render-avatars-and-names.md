# Render avatars and names
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](local-development.md) / [Previous source section](local-development-instance-participants.md) / [Following source section](preventing-unwanted-activity-sessions.md)

<a id="source-render-avatars-and-names"></a>

### Render Avatars and Names

Retrieve and render usernames and avatars for users connected to your application.

<a id="source-render-avatars-and-names"></a>

### Render Avatars and Names

 Detailed CDN and common image asset storage behavior is documented [here](https://docs.discord.com/developers/reference#image-formatting-cdn-endpoints). The following basic example retrieves a user's avatar and username.

```
// We'll be referencing the user object returned from authenticate
const {user} = await discordSdk.commands.authenticate({
  access_token: accessToken,
});

let avatarSrc = '';
if (user.avatar) {
  avatarSrc = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
} else {
  const defaultAvatarIndex = (BigInt(user.id) >> 22n) % 6n;
  avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
}

const username = user.global_name ?? `${user.username}#${user.discriminator}`;

// Then in your HTML/JSX/etc...
<img alt="avatar" src={avatarSrc} />
<p>{username}</p>

```

# Use the API to fetch the guild
Context: Discord developer reference: Use the API to fetch the guild
[Source](channel-guild-and-next-steps-index.md) / [Previous source section](use-the-sdk-to-fetch-the-channel.md) / [Following source section](next-steps.md)
<a id="source-step-7-use-the-api-to-fetch-the-guild"></a>

### Step 7: Use the API to fetch the guild

 Because the authorization request included the `identify` and `guilds` scopes, the earlier `access_token` can also be used to request those API resources. The next code block will:
1. Request [`GET /users/@me/guilds`](https://docs.discord.com/developers/resources/user#get-current-user-guilds) with `auth.access_token` to retrieve guilds for the authorizing user
2. Loop through the guilds and identify the one matching the `guildId` value from discordSdk
3. Build a new HTML image element from the guild avatar and attach it to the frontend
 This example uses a plain `fetch` request for the API call, but a JavaScript [community-built library](https://docs.discord.com/developers/developer-tools/community-resources) can be used instead.

Getting details for the current server

Add the following function in the same `client/main.js` file:

```
async function appendGuildAvatar() {
  const app = document.querySelector('#app');

  // 1. From the HTTP API fetch a list of all of the user's guilds
  const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
    headers: {
      // NOTE: we're using the access_token provided by the "authenticate" command
      Authorization: `Bearer ${auth.access_token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

  // 2. Find the current guild's info, including it's "icon"
  const currentGuild = guilds.find((g) => g.id === discordSdk.guildId);

  // 3. Append to the UI an img tag with the related information
  if (currentGuild != null) {
    const guildImg = document.createElement('img');
    guildImg.setAttribute(
      'src',
      // More info on image formatting here: https://docs.discord.com/developers/reference#image-formatting
      `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.webp?size=128`
    );
    guildImg.setAttribute('width', '128px');
    guildImg.setAttribute('height', '128px');
    guildImg.setAttribute('style', 'border-radius: 50%;');
    app.appendChild(guildImg);
  }
}

```

Then invoke the new function inside the callback for `setupDiscordSdk`:

```
setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");

  appendVoiceChannelName();
  appendGuildAvatar();
});

```

 When the Activity is relaunched, the Activity should render the current server's avatar. (Figure: Discord Activities)

Step 7 Checkpoint

At this stage, the Activity should be running. For Step 7, confirm that you have:
- Updated `client/main.js` so it fetches guild data through the [`GET /users/@me/guilds`](https://docs.discord.com/developers/resources/user#get-current-user-guilds) API endpoint
- Called the new function from the `setupDiscordSdk()` callback

---


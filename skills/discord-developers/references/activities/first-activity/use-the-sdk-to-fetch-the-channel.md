# Use the SDK to fetch the channel
Context: Discord developer reference: Use the SDK to fetch the channel
[Source](channel-guild-and-next-steps-index.md) / [Previous source section](calling-your-backend-server-from-your-client.md) / [Following source section](use-the-api-to-fetch-the-guild.md)
<a id="source-step-6-use-the-sdk-to-fetch-the-channel"></a>

### Step 6: Use the SDK to fetch the channel

 With users authenticated, the app can use contextual Discord data inside the Activity. Start by using the SDK to read details for the channel where the Activity is running. Add an async function that calls the `commands.getChannel` SDK method.

Using the SDK to retrieve a channel

Add this function to the same `getting-started-activity/client/main.js` file:

```
async function appendVoiceChannelName() {
  const app = document.querySelector('#app');

  let activityChannelName = 'Unknown';

  // Requesting the channel in GDMs (when the guild ID is null) requires
  // the dm_channels.read scope which requires Discord approval.
  if (discordSdk.channelId != null && discordSdk.guildId != null) {
    // Over RPC collect info about the channel
    const channel = await discordSdk.commands.getChannel({channel_id: discordSdk.channelId});
    if (channel.name != null) {
      activityChannelName = channel.name;
    }
  }

  // Update the UI with the name of the current voice channel
  const textTagString = `Activity Channel: "${activityChannelName}"`;
  const textTag = document.createElement('p');
  textTag.textContent = textTagString;
  app.appendChild(textTag);
}

```

Next, change the callback following `setupDiscordSdk()` so it invokes the new function:

```
setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");

  appendVoiceChannelName();
});

```

 After closing and joining the Activity again, the current channel name should be visible. (Figure: Discord Activities)

Step 6 Checkpoint

Before finishing Step 6, verify that you have:
- Changed `client/main.js` so it gets the channel name through the SDK
- Called the new function from the `setupDiscordSdk()` callback

---


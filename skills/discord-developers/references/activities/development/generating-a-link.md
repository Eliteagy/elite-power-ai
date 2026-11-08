# Generating a link
Context: Discord developer reference: Generating a link
[Source](local-development-and-assets-index.md) / [Owning endpoint, event, object or procedure conditions](prompting-users-to-share-incentivized-links.md) / [Owning endpoint, event, object or procedure conditions](generating-a-custom-link-within-your-activity.md) / [Following source section](locking-application-orientation.md)
<a id="source-generating-a-link"></a>

#### Generating a Link

```
// Convert an image array buffer to base64 string
const image = base64EncodedImage;

// Generate the quick activity link
const linkIdResponse = await fetch(`${env.discordAPI}/applications/${env.applicationId}/quick-links/`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: {
    custom_id: 'user_123/game_456',
    description: 'I just beat level 10 with a perfect score',
    title: 'Check out my high score!',
    image,
  }
});
const {link_id} = await linkIdResponse.json();

// Open the Share modal with the generated link
const {success} = await discordSdk.commands.shareLink({
  message: 'Check out my high score!',
  link_id,
});
success ? console.log('User shared link!') : console.log('User did not share link!');

```


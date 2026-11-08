# Open share moment dialog usage
Context: Discord developer reference: Open share moment dialog usage
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](open-share-moment-dialog.md) / [Following source section](setting-up-an-entry-point-command.md)
<a id="source-usage-2"></a>

#### Usage

```
import {discordSdk} from './wherever-you-initialize-your-sdk';
import {accessToken} from './wherever-you-store-your-access-token';

// some image
const imageURL = 'https://i.imgur.com/vaSWuKr.gif';

// get image data
const response = await fetch(imageURL);
const blob = await response.blob();
const mimeType = blob.type;

// image data as buffer
const buf = await blob.arrayBuffer();

// image as file
const imageFile = new File([buf], 'example.gif', {type: mimeType});

const body = new FormData();
body.append('file', imageFile);

const attachmentResponse = await fetch(`${env.discordAPI}/applications/${env.applicationId}/attachment`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  body,
});
const attachmentJson = await attachmentResponse.json();

// mediaUrl is an ephemeral Discord CDN URL
const mediaUrl = attachmentJson.attachment.url;

// opens dialog in Discord client
await discordSdk.commands.openShareMomentDialog({mediaUrl});

```

 User Experience (Figure: Example of the sharing dialog)

---


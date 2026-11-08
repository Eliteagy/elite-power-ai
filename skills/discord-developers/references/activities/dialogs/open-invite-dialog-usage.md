# Open invite dialog usage
Context: Discord developer reference: Open invite dialog usage
[Source](user-actions-index.md) / [Owning endpoint, event, object or procedure conditions](open-invite-dialog.md) / [Following source section](open-share-moment-dialog.md)
<a id="source-usage-1"></a>

#### Usage

```
import {DiscordSDK, Permissions, PermissionUtils} from '@discord/embedded-app-sdk';
const discordSdk = new DiscordSDK(clientId);
await discordSdk.ready();

try {
  const {permissions} = await discordSdk.commands.getChannelPermissions();
  if (PermissionUtils.can(Permissions.CREATE_INSTANT_INVITE, permissions)) {
    await discordSdk.commands.openInviteDialog();
    // successfully opened dialog
  } else {
    console.warn('User does not have CREATE_INSTANT_INVITE permissions');
  }
} catch (err) {
  // failed to fetch permissions or open dialog
  console.warn(err.message);
}

```

 User Experience (Figure: Invite Dialog UI) The Discord client shows a modal where the user can send an invite to a channel or friend, or copy an invite link for manual sharing.

---


# Open invite dialog
Context: Discord developer reference: Open invite dialog
[Source](user-actions-index.md) / [Previous source section](open-external-link-user-experience.md) / [Following source section](open-invite-dialog-usage.md)
<a id="source-open-invite-dialog"></a>

### Open Invite Dialog

 An Application Channel Invite can be fetched as described in [these docs](https://docs.discord.com/developers/resources/invite#get-invite), but no OAuth scope grants that ability directly. The SDK still provides `openInviteDialog`, which launches the Application Channel Invite UI in the Discord client without extra OAuth scopes. Calling it from DM (Direct Message) contexts returns an error, so restrict usage to Guild Voice or Text Channels. It also errors when the user lacks valid channel permissions; checking with `getChannelPermissions` first is strongly recommended, and that check requires OAuth scope `'guilds.members.read'`.


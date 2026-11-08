# Open share moment dialog
Context: Discord developer reference: Open share moment dialog
[Source](user-actions-index.md) / [Previous source section](open-invite-dialog-usage.md) / [Following source section](open-share-moment-dialog-usage.md)
<a id="source-open-share-moment-dialog"></a>

### Open Share Moment Dialog

 Use `openShareMomentDialog` when an application needs to share media into a channel or DM with the least custom UI. The command takes a Discord CDN `mediaUrl` such as `https://cdn.discordapp.com/attachments/...` and opens a Discord client dialog where the user can pick channels, DMs, or GDMs. No additional OAuth scopes are needed, but the application must already be authenticated. Since `mediaUrl` has to point at Discord CDN, the recommended path is the activities attachment API endpoint, `discord.com/api/applications/${applicationId}/attachment`, which creates an ephemeral CDN URL. That endpoint accepts bearer tokens for any scopes, so the application client may call it with the authorized user's bearer token. Its response is a serialized attachment containing a `url` attribute; pass that value to the DiscordSDK command as `mediaUrl`.


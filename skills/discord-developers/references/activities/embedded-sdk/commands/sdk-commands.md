# SDK commands
Context: Discord developer reference: SDK commands
[Source](../methods-commands-and-events-index.md) / [Previous source section](../methods/close-sdk-usage.md) / [Following source section](authenticate.md)
<a id="source-sdk-commands"></a>

### SDK Commands

 These commands let developers interact with the Discord client. Each SDK command below uses the `.commands` prefix, such as `discordSDK.commands.authenticate`.
| Name | Description |
| --- | --- |
| authenticate | Authenticates an existing client with your app |
| authorize | Authorizes a new client with your app |
| captureLog | Sends logs to your own logger |
| encourageHardwareAcceleration | Shows a modal dialog that lets the user enable hardware acceleration |
| getChannel | Gets channel information for the channel_id |
| getChannelPermissions | Gets the current user's permissions in the currently connected channel |
| getEntitlements | Gets the current user's entitlement list |
| getActivityInstanceConnectedParticipants | Gets every participant connected to the instance |
| getPlatformBehaviors | Returns information about supported platform behaviors |
| getRelationships | Lets your app read a user's Discord Friends list, pending requests, and blocked users. Access is handled through the Social SDK, requires submission for access, and is subject to Social SDK Terms, including Section 5(a)(ii), for obtained data |
| getSkus | Gets your app's SKU list |
| initiateImageUpload | Opens the Discord client file upload flow |
| openExternalLink | Lets the app open an external link inside the Discord client |
| openInviteDialog | Shows a modal dialog with Channel Invite UI and does not require additional OAuth scopes |
| openShareMomentDialog | Shows a modal dialog for sharing media to a channel or DM |
| setActivity | Changes how the activity's rich presence appears in the Discord client |
| setConfig | Sets whether PIP (picture-in-picture) can be interactive |
| setOrientationLockState | Sets orientation and picture-in-picture (PIP) options |
| shareLink | Shows a modal so the user can share an activity link with custom query params |
| startPurchase | Starts the purchase flow for a specific SKU, using the sku_id |
| userSettingsGetLocale | Gets the current user's locale |


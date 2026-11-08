# OAuth2 device authorization flow
Context: Discord developer reference: OAuth2 device authorization flow
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](overview-prerequisites.md) / [Following source section](automatic-token-handling.md)
<a id="source-oauth2-device-authorization-flow"></a>

### OAuth2 Device Authorization Flow

 Console users cannot authenticate through a browser inside the console experience. Instead, the process is:
1. The game asks Discord for a device code
2. The user approves by scanning a QR code or by entering a user code at `discord.com/activate`.
3. The game polls the Discord API and exchanges the device code for an access token.
 The SDK can complete the process automatically, or the game can handle tokens itself. OAuth2 device authorization works only for verified user accounts. (Figure: Authorization screen using OpenAuthorizeDeviceScreen and GetTokenFromDevice)

---


# Display authorize screen with qr code and user code
Context: Discord developer reference: Display authorize screen with qr code and user code
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](request-a-device-code-from-discord-example-response.md) / [Following source section](poll-for-user-s-authorization.md)
<a id="source-step-2-display-authorize-screen-with-qr-code-and-user-code"></a>

### Step 2: Display Authorize Screen with QR Code and User Code

 After the user code is requested, call [`Client::OpenAuthorizeDeviceScreen`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#af29a13acc992a75fc0870051ff68575b) to open an authorization screen.

```
client->OpenAuthorizeDeviceScreen(APPLICATION_ID, user_code);

```

 A manual-entry UI can show `verification_uri_complete`, or show `verification_uri` together with `user_code`, so the user can type the code. (Figure: Authorization screen using OpenAuthorizeDeviceScreen and GetTokenFromDevice) After approval in a browser or on a mobile device, the Step 1 `device_code` can be exchanged for an access token.


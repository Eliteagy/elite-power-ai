# Android deep link not working
Context: Discord developer reference: Android deep link not working
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](i-os-authorization-opens-browser-instead-of-discord-app.md) / [Following source section](token-exchange-fails-with-invalid-grant.md)
<a id="source-android-deep-link-not-working"></a>

#### Android: Deep Link Not Working

 **Problem**: The app does not receive the callback after authorization. **Solutions**:
1. Confirm that AndroidManifest.xml contains the correct intent filter
2. Confirm that `android:scheme` matches the redirect URI: `discord-YOUR_APP_ID`
3. If you need to process multiple intents, confirm that the activity launch mode is `singleTask` or `singleTop`


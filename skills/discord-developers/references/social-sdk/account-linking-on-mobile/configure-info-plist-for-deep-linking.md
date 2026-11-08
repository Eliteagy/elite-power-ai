# Configure info plist for deep linking
Context: Discord developer reference: Configure info plist for deep linking
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](configure-url-scheme-in-unity-project-settings.md) / [Previous source section](set-microphone-usage-description.md) / [Following source section](enable-background-voice-support-optional.md)
<a id="source-3-configure-infoplist-for-deep-linking"></a>

#### 3. Configure Info.plist for Deep Linking

 Native authentication requires your `Info.plist` to include the `discord` scheme:

```
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>discord</string>
</array>

```

 This lets your app detect whether the Discord mobile app is installed and open it through a deep link for authentication.


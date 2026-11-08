# Configure custom url scheme
Context: Discord developer reference: Configure custom url scheme
[Source](account-linking-on-mobile-index.md) / [Previous source section](enable-background-voice-support-optional.md) / [Following source section](add-androidx-browser-dependency.md)
<a id="source-android-configuration"></a> <a id="source-1-configure-custom-url-scheme"></a>

### Android Configuration

#### 1. Configure Custom URL Scheme

 [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) requires an activity with a custom URL scheme in your application manifest:
1. The [Unity sample project](https://discord.com/developers/applications/select/social-sdk/downloads) provides an example build processor at `Assets/Scripts/Editor/AndroidPostBuildProcessor.cs`
2. You can instead add an intent filter manually to `AndroidManifest.xml`:

```
<activity android:name="com.discord.socialsdk.AuthenticationActivity"
android:exported="true">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="discord-YOUR_APP_ID" />
  </intent-filter>
</activity>

```

 Replace `YOUR_APP_ID` with the real Discord application ID, such as `discord-1234567890123456789`.


# Configure authorization support
Context: Discord developer reference: Configure authorization support
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-android-project.md) / [Previous source section](android-setup-run-callbacks-in-game-loop.md) / [Following source section](what-is-pkce.md)
<a id="source-8-configure-authorization-support"></a>

#### 8. Configure Authorization Support

 To support [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468):
1. Add the `androidx.browser` dependency, version 1.8 or later, to `build.gradle`:

```
dependencies {
    implementation 'androidx.browser:browser:1.8.0'
    // Your other dependencies...
}

```

1. Add the matching `AndroidManifest.xml` activity registration:

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

---


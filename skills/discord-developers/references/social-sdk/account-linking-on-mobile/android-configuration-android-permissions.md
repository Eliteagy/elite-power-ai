# Android configuration android permissions
Context: Discord developer reference: Android configuration android permissions
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](configure-custom-url-scheme.md) / [Previous source section](add-androidx-browser-dependency.md) / [Following source section](unreal-engine-setup.md)
<a id="source-3-android-permissions"></a>

#### 3. Android Permissions

 The Android SDK requests these permissions:

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MICROPHONE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.BLUETOOTH" /> <!-- SDK <= 30 -->
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" /> <!-- SDK >= 31 -->

```

 If your application does not use voice features, you may remove every permission except `INTERNET` by using the `tools:node="remove"` attribute [in your AndroidManifest.xml](https://developer.android.com/build/manage-manifests#node_markers).

---


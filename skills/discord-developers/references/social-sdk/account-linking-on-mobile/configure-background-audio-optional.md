# Configure background audio optional
Context: Discord developer reference: Configure background audio optional
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-and-configure-xcode-project.md) / [Previous source section](configure-build-settings.md) / [Following source section](register-url-scheme.md)
<a id="source-3-configure-background-audio-optional"></a>

#### 3. Configure Background Audio (Optional)

 To keep voice connected while the app is backgrounded:
1. Configure background audio modes in `Info.plist` through the `Signing & Capabilities` tab
2. Select *Audio, AirPlay, and Picture in Picture*, **not** Voice over IP
3. See [Configuring your app for Media Playback](https://developer.apple.com/documentation/avfoundation/configuring-your-app-for-media-playback?language=objc) for detailed instructions


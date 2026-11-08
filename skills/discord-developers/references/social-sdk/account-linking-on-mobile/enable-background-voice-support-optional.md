# Enable background voice support optional
Context: Discord developer reference: Enable background voice support optional
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](configure-url-scheme-in-unity-project-settings.md) / [Previous source section](configure-info-plist-for-deep-linking.md) / [Following source section](configure-custom-url-scheme.md)
<a id="source-4-enable-background-voice-support-optional"></a>

#### 4. Enable Background Voice Support (Optional)

 To keep voice support working while your game is backgrounded:
1. Update `Info.plist` with the needed background modes
2. The [Unity sample project](https://discord.com/developers/applications/select/social-sdk/downloads) includes a build postprocessor you can copy into your project at `Assets/Scripts/Editor/VoicePostBuildProcessor.cs`
 For background voice, choose *Audio, AirPlay, and Picture in Picture* background mode rather than Voice over IP. See [Configuring your app for Media Playback](https://developer.apple.com/documentation/avfoundation/configuring-your-app-for-media-playback?language=objc) for details.


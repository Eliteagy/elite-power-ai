# Configure url scheme in Unity project settings
Context: Discord developer reference: Configure url scheme in Unity project settings
[Source](account-linking-on-mobile-index.md) / [Previous source section](unity-setup.md) / [Following source section](set-microphone-usage-description.md)
<a id="source-ios-configuration"></a> <a id="source-1-configure-url-scheme-in-unity-project-settings"></a>

### iOS Configuration

#### 1. Configure URL Scheme in Unity Project Settings

 To support [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468), configure a callback URL scheme:
1. Open Project Settings: `Edit -> Project Settings...`
2. Navigate to the `Player` section
3. Select the `iOS` tab
4. Under `Other Settings`, find `Supported URL Schemes`
5. Add `discord-YOUR_APP_ID` to the list; for example, if your application ID is `123456`, add `discord-123456`


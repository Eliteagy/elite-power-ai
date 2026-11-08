# Configure build settings
Context: Discord developer reference: Configure build settings
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-and-configure-xcode-project.md) / [Following source section](configure-background-audio-optional.md)
<a id="source-2-configure-build-settings"></a>

#### 2. Configure Build Settings

1. Add the xcframework to `Build Phases -> Link Binary with Libraries` if needed
2. In the `General` tab, under `Frameworks, Libraries and Embedded Content`:
  - Set `discord_partner_sdk.xcframework` to **Embed & Sign**


# Initialize SDK in activity
Context: Discord developer reference: Initialize SDK in activity
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-android-project.md) / [Previous source section](android-setup-include-sdk-headers.md) / [Following source section](android-setup-run-callbacks-in-game-loop.md)
<a id="source-6-initialize-sdk-in-activity"></a>

#### 6. Initialize SDK in Activity

 In your main activity's `onCreate` method (Java/Kotlin):

```
com.discord.socialsdk.DiscordSocialSdkInit.setEngineActivity(this);

```


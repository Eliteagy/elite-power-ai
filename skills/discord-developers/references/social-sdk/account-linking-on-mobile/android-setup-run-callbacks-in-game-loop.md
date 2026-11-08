# Android setup run callbacks in game loop
Context: Discord developer reference: Android setup run callbacks in game loop
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-android-project.md) / [Previous source section](initialize-sdk-in-activity.md) / [Following source section](configure-authorization-support.md)
<a id="source-7-run-callbacks-in-game-loop"></a>

#### 7. Run Callbacks in Game Loop

 In your main C++ loop:

```
discordpp::RunCallbacks();

```


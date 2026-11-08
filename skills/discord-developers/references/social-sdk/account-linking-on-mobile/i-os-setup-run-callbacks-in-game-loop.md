# I os setup run callbacks in game loop
Context: Discord developer reference: I os setup run callbacks in game loop
[Source](account-linking-on-mobile-index.md) / [Owning endpoint, event, object or procedure conditions](create-and-configure-xcode-project.md) / [Previous source section](i-os-setup-include-sdk-headers.md) / [Following source section](create-android-project.md)
<a id="source-6-run-callbacks-in-game-loop"></a>

#### 6. Run Callbacks in Game Loop

 Call this from your main game loop:

```
discordpp::RunCallbacks();

```


# Discord local player subsystem
Context: Discord developer reference: Discord local player subsystem
[Source](unreal-setup-and-authentication-index.md) / [Previous source section](initialize-the-sdk.md) / [Following source section](discord-social-unreal-character-h.md)
<a id="source-discordlocalplayersubsystem"></a>

### DiscordLocalPlayerSubsystem

 Unreal Engine integration needs `DiscordLocalPlayerSubsystem`, which owns the client lifecycle and runs the [`RunCallbacks`](https://discord.com/developers/docs/social-sdk/namespacediscordpp.html#ab5dd8cf274f581ee1885de5816be3c29) event loop. Add this code to `DiscordSocialUnrealCharacter.h`:

```
#include "DiscordLocalPlayerSubsystem.h"

```

 Add these functions to the public section of the DiscordSocialUnrealCharacter class:


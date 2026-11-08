# Encourage hardware acceleration
Context: Discord developer reference: Encourage hardware acceleration
[Source](user-actions-index.md) / [Previous source section](creating-an-entry-point-command.md) / [Following source section](encourage-hardware-acceleration-best-practices.md)
<a id="source-encourage-hardware-acceleration"></a>

### Encourage Hardware Acceleration

 Compute-heavy Activities may perform better when hardware acceleration is enabled. When the app calls `encourageHardwareAcceleration`, Discord returns the setting's current state and, when relevant, prompts the user to change it. If Hardware Acceleration is disabled, the Discord client shows a modal recommending the change. Selecting **Don't show me this again** prevents that modal from appearing for *any application* on that device.


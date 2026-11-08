# Alternatives for publishers without a shared social graph
Context: Discord developer reference: Alternatives for publishers without a shared social graph
[Source](publisher-level-account-linking-index.md) / [Previous source section](revoking-game-tokens.md) / [Following source section](next-steps.md)
<a id="source-alternatives-for-publishers-without-a-shared-social-graph"></a>

### Alternatives for Publishers Without a Shared Social Graph

 If your studio has a central publisher account system but no social graph shared between games, you can instead build a central backend that manages distinct Discord application IDs per game under the standard authentication model. That still lets you reuse Social SDK integration code across titles while keeping each game's Discord connection independent. You could also provide publisher account settings where players link, unlink, and choose which Discord account is connected to each game. The cost is that every game needs its own authorization and the implementation is larger, but players get more precise control over which games connect to Discord, which may better match your studio or game requirements.

---


# Authorization is all or nothing at the publisher level
Context: Discord developer reference: Authorization is all or nothing at the publisher level
[Source](publisher-level-account-linking-index.md) / [Owning endpoint, event, object or procedure conditions](key-behaviors-to-understand.md) / [Following source section](relationships-exist-at-the-publisher-level-not-per-game.md)
<a id="source-authorization-is-all-or-nothing-at-the-publisher-level"></a>

#### Authorization is all-or-nothing at the publisher level:

- After a player links Discord to the publisher application, the authorization covers **all** child game applications beneath that publisher
- Players cannot stay linked at the publisher level while disabling Discord for only one child game
- Revocation breaks the Discord connection between the publisher account and the Discord account, which impacts every game


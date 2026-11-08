# Relationships exist at the publisher level not per game
Context: Discord developer reference: Relationships exist at the publisher level not per game
[Source](publisher-level-account-linking-index.md) / [Owning endpoint, event, object or procedure conditions](key-behaviors-to-understand.md) / [Previous source section](authorization-is-all-or-nothing-at-the-publisher-level.md) / [Following source section](how-it-works.md)
<a id="source-relationships-exist-at-the-publisher-level-not-per-game"></a>

#### Relationships exist at the publisher level, not per-game:

 Friend relationships are scoped to the publisher, not separately to each game. There are no isolated per-game friend lists. If your product requires different friend lists for different games, Publisher Level Account Linking is the wrong model. **This is a one-way architectural decision.** After child applications are attached to a parent publisher application, some data is deleted and the relationship cannot be undone. Review the migration carefully before changing existing applications.

---


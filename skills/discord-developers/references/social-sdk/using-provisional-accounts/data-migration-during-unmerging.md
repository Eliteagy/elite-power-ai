# Data migration during unmerging
Context: Discord developer reference: Data migration during unmerging
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](ban-driven-unmerge.md) / [Following source section](unmerge-request-failures.md)
<a id="source-data-migration-during-unmerging"></a>

### Data Migration During Unmerging

 When a user unmerges, Discord creates a provisional account with a new user ID. This data moves to that new provisional account:
- **Username**: The global name is copied onto the new provisional account
- **In-game friends**: All are copied to the new provisional account
- **Discord friends who use this application**: Copied to the provisional account
- **Blockers**: Accounts that blocked the original Discord account remain preserved
- **Lobbies**: Active lobby memberships for the application are moved
 This data is **not** moved:
- **Discord friends who don't use this application**: Not transferred
- **DM message history**: Not moved into provisional accounts
 Provisional accounts can include Discord friends, but messaging those friends is allowed only while actively playing the game.


# Establish parent child relationships
Context: Discord developer reference: Establish parent child relationships
[Source](publisher-level-account-linking-index.md) / [Previous source section](configure-game-applications.md) / [Following source section](match-confidentiality-settings.md)
<a id="source-3-establish-parent-child-relationships"></a>

### 3. Establish Parent-Child Relationships

 Discord must link your game applications to the publisher application. To request those child-to-parent links, provide Discord with the following:
- Parent application ID (publisher)
- Child application IDs (games)
 Discord will create the relationships internally so token exchange can work. After the parent-child relationship exists, publisher and game applications lose access to some actions. Migrating an existing application into either role can immediately disrupt certain flows, so discuss the migration with Discord before starting. Another option is to create new publisher and game applications specifically for Publisher Level Account Linking. When a child application is linked, the following child data is removed:
| **Data Type** | **Action** |
| --- | --- |
| OAuth2 tokens | Every token for the child app is deleted |
| Lobbies | Every lobby tied to the child app is deleted |
| User Application Identities | Deleted for all users |
| Provisional accounts | All provisional users are deleted |
| Game Relationships | Removed for every user linked to the app |

 The parent application is not changed; existing parent tokens remain valid because they still work with ordinary OAuth2 flows.


# Relationship types
Context: Discord developer reference: Relationship types
[Source](managing-relationships-index.md) / [Previous source section](understanding-relationship-types.md) / [Following source section](discord-friend-relationships.md)
<a id="source-relationship-types"></a>

### Relationship Types

 Some users want friendships that follow them across Discord and every game. When they try a new game, those friends are already visible. Other users prefer to share access only inside the current game. To support both cases, the Discord Social SDK models two relationship categories:
- **Discord relationships**: These persist across games and in the Discord client. Each user can see the other's online state even when they are not in the same game. Discord Relationships are equivalent to becoming friends in the Discord client.
- **Game relationships**: These apply only to one game and do not transfer to other games. The users can see each other online only while they are playing a game where they are friends. Game friends can DM each other, and those DMs appear in Discord, unless they disable that behavior and keep conversations limited to the game. Users can find that control by opening User Settings, going to "Content & Social", and using the "Connected Games" tab near the top.
 Use [`RelationshipHandle`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#a7da36b15ad0b7d38ba658a622e9ded77) to inspect what kind of friendship exists between the player and another user. It exposes two fields:
- [`RelationshipHandle::DiscordRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#a5fecfb79a4a2b6f3dc5f73b09d0c3881) for the **Discord friendship**
- [`RelationshipHandle::GameRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#aa60146eb72ede07e3e615565f61f97eb) for the **game friendship**
 Both friend types matter because two users may begin as game friends and later choose to "upgrade" to full Discord friends. In that situation, [`RelationshipHandle::DiscordRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#a5fecfb79a4a2b6f3dc5f73b09d0c3881) becomes `RelationshipType::PendingIncoming` or `RelationshipType::PendingOutgoing`, depending on whether the current user received or sent the request, while [`RelationshipHandle::GameRelationshipType`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1RelationshipHandle.html#aa60146eb72ede07e3e615565f61f97eb) remains `RelationshipType::Friend`. The API can represent users who are both kinds of friends, but you do not need to force every Discord friend to also be a game friend, or every game friend to also be a Discord friend. When adding friends, let users choose the relationship type and make the difference clear. See the design guidelines for more.


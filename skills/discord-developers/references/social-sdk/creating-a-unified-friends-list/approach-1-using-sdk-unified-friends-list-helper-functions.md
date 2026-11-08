# Approach 1 using SDK unified friends list helper functions
Context: Discord developer reference: Approach 1 using SDK unified friends list helper functions
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](user-status-rich-presence.md) / [Following source section](display-the-unified-friends-list.md)
<a id="source-approach-1-using-sdk-unified-friends-list-helper-functions"></a>

### Approach 1: Using SDK Unified Friends List Helper Functions

 This recommended approach reduces the code you write and maintain while aligning the list with Discord's [recommended design guidelines](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/unified-friends-list). The Discord Social SDK includes helper functions that group and sort friends according to those guidelines, avoiding manual relationship fetching and organization. The SDK places friends into the three groups defined by [`RelationshipGroupType`](https://discord.com/developers/docs/social-sdk/namespacediscordpp.html#a503ed2f7b0bfbd435321a0e8b1dfba35):
- `OnlinePlayingGame`: Friends who are online and playing your game
- `OnlineElsewhere`: Friends who are online but are not playing your game
- `Offline`: Friends who are offline


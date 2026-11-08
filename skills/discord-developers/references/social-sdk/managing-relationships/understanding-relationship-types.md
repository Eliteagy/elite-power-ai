# Understanding relationship types
Context: Discord developer reference: Understanding relationship types
[Source](managing-relationships-index.md) / [Previous source section](prerequisites.md) / [Following source section](relationship-types.md)
<a id="source-understanding-relationship-types"></a>

### Understanding Relationship Types

 In the SDK, the Relationship entity represents the connection between two users. It covers more than friendship: the same model is used for sent requests, received requests, and blocked users. Although the SDK can modify a user's relationships, do so only after explicit user consent. Do not send or accept friend requests automatically. Call relationship-management APIs only from user-driven actions, such as pressing a "Send Friend Request" button.


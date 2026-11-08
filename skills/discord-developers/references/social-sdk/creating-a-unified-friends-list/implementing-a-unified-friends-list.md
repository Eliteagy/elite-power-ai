# Implementing a unified friends list
Context: Discord developer reference: Implementing a unified friends list
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](prerequisites.md) / [Following source section](relationships.md)
<a id="source-implementing-a-unified-friends-list"></a>

### Implementing a Unified Friends List

 A Discord friend list is built from Relationships and Users. Use the Relationships API to identify the people connected to the user, then use the Users API to fetch rendering details such as online state.


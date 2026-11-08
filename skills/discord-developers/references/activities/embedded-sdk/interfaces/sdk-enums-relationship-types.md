# SDK enums relationship types
Context: Discord developer reference: SDK enums relationship types
[Source](../object-interfaces-index.md) / [Owning endpoint, event, object or procedure conditions](channel-types-object.md) / [Previous source section](sku-type-object.md)
<a id="source-relationship-types"></a>

#### Relationship Types

| Value | Name | Description |
| --- | --- | --- |
| 0 | None | No relationship exists between the user and the other user. |
| 1 | Friend | The user and the other user are friends. |
| 2 | Blocked | The current user blocked the target user. |
| 3 | Pending Incoming | The target user sent the current user a friend request that is still pending. |
| 4 | Pending Outgoing | The current user sent the target user a friend request that is still pending. |
| 5 | Implicit | Implicit is listed so the type is visible, but SDK code should not use it. |
| 6 | Suggestion | Suggestion is listed so the type is visible, but SDK code should not use it. |

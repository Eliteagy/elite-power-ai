# Relationship update dispatch data structure
Context: Discord developer reference: Relationship update dispatch data structure
[Source](relationship-and-entitlement-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events-relationship-update.md) / [Following source section](relationship-update-relationship-types.md)
<a id="source-rpc-part-3"></a> <a id="source-relationship-update-dispatch-data-structure"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

###### Relationship Update Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | relationship type |
| user | partial user object | the related user |
| presence | presence object | current presence for the related user |


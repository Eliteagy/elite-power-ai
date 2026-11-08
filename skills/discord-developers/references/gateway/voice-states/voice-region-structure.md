# Voice region structure
Context: Discord developer reference: Voice region structure
[Source](../../resources/users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](voice-state-object.md) / [Following source section](list-voice-regions.md)
<a id="source-voice-region-object"></a> <a id="source-voice-region-structure"></a>

### Voice Region Object

###### Voice Region Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | unique ID for the region |
| name | string | name of the region |
| optimal | boolean | true for the single server nearest to the current user's client |
| deprecated | boolean | whether this voice region is deprecated; avoid switching to deprecated regions |
| custom | boolean | whether this is a custom voice region, such as one used for events |


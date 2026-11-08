# Client status object
Context: Discord developer reference: Client status object
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](presence-presence-update.md) / [Following source section](activity-object-activity-structure.md)
<a id="source-client-status-object"></a>

#### Client Status Object

 For active sessions, each platform reports an "online", "idle", or "dnd" string. Offline or invisible users omit the matching platform field.
| Field | Type | Description |
| --- | --- | --- |
| desktop? | string | Status for the user's active desktop application session on Windows, Linux, or Mac. |
| mobile? | string | Status for the user's active mobile application session on iOS or Android. |
| web? | string | Status for the user's active web application session, including browser and bot user sessions. |


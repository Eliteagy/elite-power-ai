# Send events
Context: Discord developer reference: Send events
[Source](identify-ready-and-guild-events-index.md) / [Previous source section](payload-structure.md) / [Following source section](send-events-identify.md)
<a id="source-send-events"></a>

### Send Events

 Send events are Gateway events contained in an [event payload](https://docs.discord.com/developers/events/gateway-events#payload-structure) and delivered from an app to Discord over a Gateway connection. Older material called Gateway send events commands.
| Name | Description |
| --- | --- |
| Identify | Starts the initial gateway handshake |
| Resume | Resumes a dropped gateway connection |
| Heartbeat | Maintains an active gateway connection |
| Request Guild Members | Requests members for a guild |
| Request Soundboard Sounds | Fetches soundboard sounds for selected guilds |
| Request Channel Info | Fetches temporary channel data for channels in a guild |
| Update Voice State | Connects, relocates, or disconnects the app from a voice channel |
| Update Presence | Updates an app’s presence |


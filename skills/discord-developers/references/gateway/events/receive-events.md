# Receive events
Context: Discord developer reference: Receive events
[Source](identify-ready-and-guild-events-index.md) / [Previous source section](request-channel-info-update-presence.md) / [Following source section](receive-events-hello.md)
<a id="source-receive-events"></a>

### Receive Events

 Receive events are Gateway events carried in an [event payload](https://docs.discord.com/developers/events/gateway-events#payload-structure) and sent from Discord to an app through the Gateway connection. They describe activity in Discord servers where the app is installed.
| Name | Description |
| --- | --- |
| Hello | Defines the heartbeat interval |
| Ready | Contains the initial state information |
| Resumed | Response to Resume |
| Reconnect | Server is shutting down; the client should reconnect to the gateway and resume |
| Rate Limited | App hit a rate limit for a gateway opcode |
| Invalid Session | Identify or Resume failed, or the active session is invalid |
| Application Command Permissions Update | Application command permission was updated |
| Auto Moderation Rule Create | Auto Moderation rule was created |
| Auto Moderation Rule Update | Auto Moderation rule was updated |
| Auto Moderation Rule Delete | Auto Moderation rule was deleted |
| Auto Moderation Action Execution | Auto Moderation triggered a rule and ran an action, such as blocking a message |
| Channel Create | New guild channel created |
| Channel Update | Channel was updated |
| Channel Delete | Channel was deleted |
| Channel Info | Response to Request Channel Info |
| Channel Pins Update | Message was pinned or unpinned |
| Thread Create | Thread was created; also delivered when the user is added to a private thread |
| Thread Update | Thread was updated |
| Thread Delete | Thread was deleted |
| Thread List Sync | Delivered when access to a channel is gained, with all active threads in that channel |
| Thread Member Update | Thread member data for the current user changed |
| Thread Members Update | One or more users joined or left a thread |
| Entitlement Create | Entitlement was created |
| Entitlement Update | Entitlement was updated or renewed |
| Entitlement Delete | Entitlement was deleted |
| Guild Create | Unavailable guild was lazy-loaded, a guild became available, or the user joined a new guild |
| Guild Update | Guild was updated |
| Guild Delete | Guild became unavailable, or the user left or was removed from it |
| Guild Audit Log Entry Create | A guild audit log entry was added |
| Guild Ban Add | A user was banned from a guild |
| Guild Ban Remove | A user ban was removed from a guild |
| Guild Emojis Update | Guild emojis were updated |
| Guild Stickers Update | Guild stickers were updated |
| Guild Integrations Update | Guild integration was updated |
| Guild Member Add | New user joined a guild |
| Guild Member Remove | A user was removed from a guild |
| Guild Member Update | Guild member was updated |
| Guild Members Chunk | Response to Request Guild Members |
| Guild Role Create | Guild role was created |
| Guild Role Update | Guild role was updated |
| Guild Role Delete | Guild role was deleted |
| Guild Scheduled Event Create | Guild scheduled event was created |
| Guild Scheduled Event Update | Guild scheduled event was updated |
| Guild Scheduled Event Delete | Guild scheduled event was deleted |
| Guild Scheduled Event User Add | A user subscribed to a guild scheduled event |
| Guild Scheduled Event User Remove | A user unsubscribed from a guild scheduled event |
| Guild Soundboard Sound Create | Guild soundboard sound was created |
| Guild Soundboard Sound Update | Guild soundboard sound was updated |
| Guild Soundboard Sound Delete | Guild soundboard sound was deleted |
| Guild Soundboard Sounds Update | Guild soundboard sounds were updated |
| Soundboard Sounds | Response to Request Soundboard Sounds |
| Integration Create | Guild integration was created |
| Integration Update | Guild integration was updated |
| Integration Delete | Guild integration was deleted |
| Interaction Create | A user used an interaction, such as an Application Command |
| Invite Create | A channel invite was created |
| Invite Delete | A channel invite was deleted |
| Message Create | Message was created |
| Message Update | Message was edited |
| Message Delete | Message was deleted |
| Message Delete Bulk | Several messages were deleted together |
| Message Reaction Add | User reacted to a message |
| Message Reaction Remove | A user removed a reaction from a message |
| Message Reaction Remove All | Every reaction was explicitly cleared from a message |
| Message Reaction Remove Emoji | Every reaction for a specific emoji was explicitly cleared from a message |
| Presence Update | User was updated |
| Stage Instance Create | Stage instance was created |
| Stage Instance Update | Stage instance was updated |
| Stage Instance Delete | Stage instance was deleted or closed |
| Subscription Create | Premium App Subscription was created |
| Subscription Update | Premium App Subscription was updated |
| Subscription Delete | Premium App Subscription was deleted |
| Typing Start | A user began typing in a channel |
| User Update | Properties about the user changed |
| Voice Channel Effect Send | An effect was sent in a voice channel where the current user is connected |
| Voice Channel Start Time Update | Voice channel start time was updated |
| Voice Channel Status Update | Voice channel status was updated |
| Voice State Update | A user joined, left, or moved between voice channels |
| Voice Server Update | Guild’s voice server was updated |
| Webhooks Update | Guild channel webhook was created, updated, or deleted |
| Message Poll Vote Add | User voted on a poll |
| Message Poll Vote Remove | A user removed a poll vote |


# SDK events
Context: Discord developer reference: SDK events
[Source](../methods-commands-and-events-index.md) / [Previous source section](../commands/user-settings-get-locale-usage.md) / [Following source section](ready.md)
<a id="source-sdk-events"></a>

### SDK Events

 Developers can pair these events with the `subscribe()` SDK method to receive events from Discord and supported devices.
| Name | Description |
| --- | --- |
| READY | non-subscription event emitted right after connection and carrying server information |
| ERROR | non-subscription event emitted for errors, including command responses |
| VOICE_STATE_UPDATE | emitted after subscribed voice-channel state changes for a user, such as mute or volume updates |
| SPEAKING_START | emitted when a user in a subscribed voice channel begins speaking |
| SPEAKING_STOP | emitted when a user in a subscribed voice channel stops speaking |
| ACTIVITY_LAYOUT_MODE_UPDATE | Received after a user changes the layout mode in the Discord client |
| ORIENTATION_UPDATE | Received when screen orientation changes |
| CURRENT_USER_UPDATE | Received after the current user object changes |
| CURRENT_GUILD_MEMBER_UPDATE | Received after the current guild member object changes |
| THERMAL_STATE_UPDATE | Received when Android or iOS thermal states are exposed to the Discord app |
| ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE | Received after the instance participant count changes |
| RELATIONSHIP_UPDATE | Received after one of the current user's relationships changes |
| ENTITLEMENT_CREATE | Received after an entitlement is created for a SKU |


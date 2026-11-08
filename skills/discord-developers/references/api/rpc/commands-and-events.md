# Commands and events
Context: Discord developer reference: Commands and events
[Source](connection-and-command-contracts-index.md) / [Previous source section](authenticating.md) / [Following source section](commands-and-events-authorize.md)
<a id="source-commands-and-events"></a> <a id="source-rpc-commands"></a> <a id="source-rpc-events"></a>

### Commands and Events

 Commands are client requests delivered to that RPC socket by a client. The structure of responses from that RPC server is similar to that HTTP API but may not be exactly equivalent.

###### RPC Commands

| Name | Description |
| --- | --- |
| DISPATCH | event dispatch |
| AUTHORIZE | used for authorize a new client with your app |
| AUTHENTICATE | used for authenticate an existing client with your app |
| GET_GUILD | used for retrieve server information from that client |
| GET_GUILDS | used for retrieve a list of guilds from that client |
| GET_CHANNEL | used for retrieve channel information from that client |
| GET_CHANNELS | used for retrieve a list of channel records for a server from that client |
| SUBSCRIBE | used for subscribe to an RPC event |
| UNSUBSCRIBE | used for unsubscribe from an RPC event |
| SET_USER_VOICE_SETTINGS | used for change voice settings of user accounts in voice channels |
| SELECT_VOICE_CHANNEL | used for join or leave a voice channel, group dm, or dm |
| GET_SELECTED_VOICE_CHANNEL | used for get the current voice channel the client is in |
| SELECT_TEXT_CHANNEL | used for join or leave a text channel, group dm, or dm |
| GET_VOICE_SETTINGS | used for retrieve the client’s voice settings |
| SET_VOICE_SETTINGS | used for set the client’s voice settings |
| SET_CERTIFIED_DEVICES | used for send info about certified hardware devices |
| SET_ACTIVITY | used for update a user’s Rich Presence |
| SEND_ACTIVITY_JOIN_INVITE | used for consent to a Rich Presence Ask to Join request |
| CLOSE_ACTIVITY_REQUEST | used for reject a Rich Presence Ask to Join request |

 Events are payloads delivered over the socket to a client that correspond to events in Discord.

###### RPC Events

| Name | Description |
| --- | --- |
| READY | non-subscription event delivered immediately after connecting, includes server information |
| ERROR | non-subscription event emitted once there is an error, covering command responses |
| CURRENT_USER_UPDATE | sent timestamp for once the local user’s data (avatar, username, etc.) changes |
| RELATIONSHIP_UPDATE | emitted once a relationship (friend, block, etc.) is added or removed |
| GUILD_STATUS | emitted once a subscribed server’s state changes |
| GUILD_CREATE | emitted once a server is created/joined on the client |
| CHANNEL_CREATE | emitted once one channel is created/joined on the client |
| VOICE_CHANNEL_SELECT | sent timestamp for once the client joins a voice channel |
| VOICE_STATE_CREATE | emitted once one user joins a subscribed voice channel |
| VOICE_STATE_UPDATE | emitted once a user’s voice state changes in one subscribed voice channel (mute, volume, etc.) |
| VOICE_STATE_DELETE | emitted once one user parts a subscribed voice channel |
| VOICE_SETTINGS_UPDATE | sent timestamp for once the client’s voice settings update |
| VOICE_CONNECTION_STATUS | sent timestamp for once the client’s voice connection status changes |
| SPEAKING_START | emitted once one user in a subscribed voice channel speaks |
| SPEAKING_STOP | emitted once one user in a subscribed voice channel stops speaking |
| MESSAGE_CREATE | emitted once a message is created in a subscribed text channel |
| MESSAGE_UPDATE | emitted once a message is updated in a subscribed text channel |
| MESSAGE_DELETE | emitted once a message is deleted in a subscribed text channel |
| NOTIFICATION_CREATE | sent timestamp for once the client receives a notification (mention or new message in eligible channels) |
| ACTIVITY_JOIN | sent timestamp for once the user account clicks a Rich Presence join invite in chat to join a game |
| ACTIVITY_SPECTATE | sent timestamp for once the user account clicks a Rich Presence spectate invite in chat to spectate a game |
| ACTIVITY_JOIN_REQUEST | sent timestamp for once the user account receives a Rich Presence Ask to Join request |
| ACTIVITY_INVITE | sent timestamp for once the user account receives an activity invitation |
| ENTITLEMENT_CREATE | emitted once one user purchases or receives a new entitlement (SKU/Game) |
| ENTITLEMENT_DELETE | emitted once an entitlement is removed |


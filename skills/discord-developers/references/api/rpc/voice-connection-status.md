# Voice connection status
Context: Discord developer reference: Voice connection status
[Source](voice-settings-and-dispatch-events-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](voice-state-create-voice-state-update-voice-state-delete.md) / [Following source section](message-create-message-update-message-delete.md)
<a id="source-voice_connection_status"></a> <a id="source-voice-connection-status-dispatch-data-structure"></a> <a id="source-voice-connection-states"></a> <a id="source-example-voice-connection-status-dispatch-payload"></a>

#### VOICE_CONNECTION_STATUS

 No arguments

###### Voice Connection Status Dispatch Data Structure

| Field | Type | Description |
| --- | --- | --- |
| state | string | voice connection state, chosen from the states listed below |
| hostname | string | hostname for the voice server currently connected |
| pings | array of integers | last 20 pings (in ms) |
| average_ping | integer | average ping (in ms) |
| last_ping | integer | last ping (in ms) |

###### Voice Connection States

| Field | Description |
| --- | --- |
| DISCONNECTED | TCP disconnected |
| AWAITING_ENDPOINT | Waiting for voice endpoint |
| AUTHENTICATING | TCP authenticating |
| CONNECTING | TCP connecting |
| CONNECTED | TCP connected |
| VOICE_DISCONNECTED | TCP connected, Voice disconnected |
| VOICE_CONNECTING | TCP connected, Voice connecting |
| VOICE_CONNECTED | TCP connected, Voice connected |
| NO_ROUTE | No route to host |
| ICE_CHECKING | WebRTC ice checking |

###### Example Voice Connection Status Dispatch Payload

```
{
  "cmd": "DISPATCH",
  "evt": "VOICE_CONNECTION_STATUS",
  "data": {
    "state": "VOICE_CONNECTED",
    "hostname": "some-server.discord.gg",
    "pings": [20, 13.37],
    "average_ping": 13.37,
    "last_ping": 20
  }
}

```


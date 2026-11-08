# Commands and events get channel
Context: Discord developer reference: Commands and events get channel
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-get-guild.md) / [Following source section](commands-and-events-get-channels.md)
<a id="source-get_channel"></a> <a id="source-get-channel-argument-structure"></a> <a id="source-get-channel-response-structure"></a> <a id="source-example-get-channel-command-payload"></a> <a id="source-example-get-channel-response-payload"></a>

#### GET_CHANNEL

 Used for get one channel the client is in.

###### Get Channel Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | ID for that channel to get |

###### Get Channel Response Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | channel id |
| guild_id | string | channel’s guild id |
| name | string | channel name |
| type | integer | channel type (guild text: 0, guild voice: 2, dm: 1, group dm: 3) |
| topic | string | (text) channel topic |
| bitrate | integer | (voice) bitrate of voice channel |
| user_limit | integer | (voice) user limit of voice channel (0 for none) |
| position | integer | Position for channel in channel list |
| voice_states | array of voice state objects | (voice) channel’s voice states |
| messages | array of message objects | (text) channel’s messages |

###### Example Get Channel Command Payload

```
{
  "nonce": "f682697e-d257-4a17-ac0a-7e4b84e66663",
  "args": {
    "channel_id": "199737254929760257"
  },
  "cmd": "GET_CHANNEL"
}

```

###### Example Get Channel Response Payload

```
{
  "cmd": "GET_CHANNEL",
  "data": {
    "id": "199737254929760257",
    "name": "General",
    "type": 2,
    "bitrate": 64000,
    "user_limit": 0,
    "guild_id": "199737254929760256",
    "position": 0,
    "voice_states": [
      {
        "voice_state": {
          "mute": false,
          "deaf": false,
          "self_mute": false,
          "self_deaf": false,
          "suppress": false
        },
        "user": {
          "id": "190320984123768832",
          "username": "test 2",
          "discriminator": "7479",
          "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
          "bot": false
        },
        "nick": "test user 2",
        "volume": 110,
        "mute": false,
        "pan": {
          "left": 1.0,
          "right": 1.0
        }
      }
    ]
  },
  "nonce": "f682697e-d257-4a17-ac0a-7e4b84e66663"
}

```


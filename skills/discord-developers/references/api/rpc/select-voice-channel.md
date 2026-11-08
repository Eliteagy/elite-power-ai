# Select voice channel
Context: Discord developer reference: Select voice channel
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](set-user-voice-settings.md) / [Following source section](get-selected-voice-channel.md)
<a id="source-select_voice_channel"></a> <a id="source-select-voice-channel-argument-structure"></a> <a id="source-example-select-voice-channel-command-payload"></a> <a id="source-example-select-voice-channel-response-payload"></a>

#### SELECT_VOICE_CHANNEL

 Used for join and leave voice channels, group dms, or dms. Responds using the [Get Channel](https://docs.discord.com/developers/topics/rpc#getchannel) response, `null` once none.

###### Select Voice Channel Argument Structure

| Field | Type | Description |
| --- | --- | --- |
| channel_id | string | Channel id to join (or `null` to leave) |
| timeout | integer | asynchronously join channel with time to wait before timing out |
| force | boolean | forces one user to join a voice channel |
| navigate | boolean | after joining the voice channel, navigate to it within the client |

 Once trying to join the user account to a voice channel, you get a `5003` error coded response once the user account is already in a voice channel. The `force` parameter must only be specified in response to that case where one user is already in one voice channel plus they have **approved** to be moved by your app to one new voice channel.

###### Example Select Voice Channel Command Payload

```
{
  "nonce": "5d9df76d-6408-46a1-9368-33dca74fa423",
  "args": {
    "channel_id": "199737254929760257"
  },
  "cmd": "SELECT_VOICE_CHANNEL"
}

```

###### Example Select Voice Channel Response Payload

```
{
  "cmd": "SELECT_VOICE_CHANNEL",
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
        "mute": false,
        "volume": 110,
        "pan": {
          "left": 1.0,
          "right": 1.0
        }
      }
    ]
  },
  "nonce": "5d9df76d-6408-46a1-9368-33dca74fa423"
}

```


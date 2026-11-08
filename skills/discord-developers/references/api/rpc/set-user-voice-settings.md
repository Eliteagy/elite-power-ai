# Set user voice settings
Context: Discord developer reference: Set user voice settings
[Source](connection-and-command-contracts-index.md) / [Owning endpoint, event, object or procedure conditions](commands-and-events.md) / [Previous source section](commands-and-events-get-channels.md) / [Following source section](select-voice-channel.md)
<a id="source-set_user_voice_settings"></a> <a id="source-set-user-voice-settings-argument-and-response-structure"></a> <a id="source-pan-object"></a> <a id="source-example-set-user-voice-settings-command-payload"></a> <a id="source-example-set-user-voice-settings-response-payload"></a>

#### SET_USER_VOICE_SETTINGS

 Used for change voice settings of user accounts in voice channels

###### Set User Voice Settings Argument and Response Structure

| Field | Type | Description |
| --- | --- | --- |
| user_id | string | user id |
| pan? | pan object | set the pan for the user |
| volume? | integer | set the volume of user (default is 100, min 0, max 200) |
| mute? | boolean | set the mute state for the user |

 In this current release, we only support one single modifier of voice settings at a time over RPC. Once an app changes voice settings, it can lock voice settings so that other apps connected simultaneously lose this ability to change voice settings. Settings reset to what they also were before being changed after this controlling app disconnects. Once an app that has previously set voice settings connects, the client can swap to that app’s configured voice settings plus lock voice settings again. This is one temporary situation that may be changed within the future.

###### Pan Object

| Field | Type | Description |
| --- | --- | --- |
| left | float | left pan of user (min: 0.0, max: 1.0) |
| right | float | right pan of user (min: 0.0, max: 1.0) |

###### Example Set User Voice Settings Command Payload

```
{
  "nonce": "eafc8152-2248-4478-9827-8457b7900cb4",
  "args": {
    "user_id": "192731515703001088",
    "pan": {
      "left": 1.0,
      "right": 1.0
    },
    "volume": 120,
    "mute": false
  },
  "cmd": "SET_USER_VOICE_SETTINGS"
}

```

###### Example Set User Voice Settings Response Payload

```
{
  "cmd": "SET_USER_VOICE_SETTINGS",
  "data": {
    "user_id": "192731515703001088",
    "pan": {
      "left": 1.0,
      "right": 1.0
    },
    "volume": 120,
    "mute": false
  },
  "nonce": "eafc8152-2248-4478-9827-8457b7900cb4"
}

```


# RPC command example
Context: Discord developer reference: RPC command example
[Source](certified-devices-index.md) / [Previous source section](http-request-example.md) / [Following source section](models-device-object.md)
<a id="source-websocket-example"></a> <a id="source-rpc-command-example"></a> <a id="source-rpc-response-example"></a>

### WebSocket Example

###### RPC Command Example

```
{
  "nonce": "9b4e9711-97f3-4f35-b047-32c82a51978e",
  "cmd": "SET_CERTIFIED_DEVICES",
  "args": {
    "devices": [
      {
        "type": "audioinput",
        "id": "{0.0.1.00000000}.{6cff2b76-44a8-46b9-b528-262ad8609d9f}",
        "vendor": {
          "name": "SteelSeries",
          "url": "https://steelseries.com"
        },
        "model": {
          "name": "Arctis 7",
          "url": "https://steelseries.com/gaming-headsets/arctis-7"
        },
        "related": ["{0.0.1.00000000}.{6cff2b76-44a8-46b9-b528-262ad8609d9f}"],
        "echo_cancellation": true,
        "noise_suppression": true,
        "automatic_gain_control": true,
        "hardware_mute": false
      }
    ]
  }
}

```

###### RPC Response Example

```
{
  "nonce": "9b4e9711-97f3-4f35-b047-32c82a51978e",
  "cmd": "SET_CERTIFIED_DEVICES",
  "data": null,
  "evt": null
}

```


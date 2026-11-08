# HTTP request example
Context: Discord developer reference: HTTP request example
[Source](certified-devices-index.md) / [Previous source section](getting-device-uuid.md) / [Following source section](rpc-command-example.md)
<a id="source-http-example"></a> <a id="source-http-request-example"></a> <a id="source-http-response-example"></a>

### HTTP Example

###### HTTP Request Example

```
curl -X POST -H 'Content-Type: application/json' -d '
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
' http://127.0.0.1:PORT/rpc?v=1&client_id=YOUR_CLIENT_ID

```

 The socket returns `200 OK` with this JSON body.

###### HTTP Response Example

```
{
  "cmd": "SET_CERTIFIED_DEVICES",
  "data": null,
  "evt": null,
  "nonce": "9b4e9711-97f3-4f35-b047-32c82a51978e"
}

```


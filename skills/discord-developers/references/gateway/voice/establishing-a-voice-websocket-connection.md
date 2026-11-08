# Establishing a voice websocket connection
Context: Discord developer reference: Establishing a voice websocket connection
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](retrieving-voice-server-information.md) / [Following source section](heartbeating.md)
<a id="source-establishing-a-voice-websocket-connection"></a> <a id="source-example-voice-identify-payload"></a> <a id="source-example-voice-ready-payload"></a>

### Establishing a Voice Websocket Connection

 After retrieving session_id, token, and endpoint data, connect to the voice server and complete the handshake over a second secure WebSocket. Unlike the gateway endpoint returned by the HTTP [Get Gateway](https://docs.discord.com/developers/events/gateway#get-gateway) request, the endpoint in the [Voice Server Update](https://docs.discord.com/developers/events/gateway-events#voice-server-update) payload does not include a URL protocol, so some libraries need `wss://` prepended manually. Once connected to the voice WebSocket endpoint, send an [Opcode 0 Identify](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) payload containing server_id, user_id, session_id, and token:

###### Example Voice Identify Payload

```
{
  "op": 0,
  "d": {
    "server_id": "41771983423143937",
    "user_id": "104694319306248192",
    "session_id": "my_session_id",
    "token": "my_token",
    "max_dave_protocol_version": 1
  }
}

```

 The voice server should answer with an [Opcode 2 Ready](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) payload that provides the expected `SSRC`, UDP IP/port, and supported encryption modes:

###### Example Voice Ready Payload

```
{
  "op": 2,
  "d": {
    "ssrc": 1,
    "ip": "127.0.0.1",
    "port": 1234,
    "modes": ["xsalsa20_poly1305", "xsalsa20_poly1305_suffix", "xsalsa20_poly1305_lite"],
    "heartbeat_interval": 1
  }
}

```

 The `heartbeat_interval` field shown here is incorrect and should be ignored. Use the `heartbeat_interval` value from the Hello payload instead.


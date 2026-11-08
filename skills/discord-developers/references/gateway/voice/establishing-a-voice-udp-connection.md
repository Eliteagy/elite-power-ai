# Establishing a voice udp connection
Context: Discord developer reference: Establishing a voice udp connection
[Source](voice-handshake-and-encryption-index.md) / [Previous source section](heartbeating.md) / [Following source section](end-to-end-encryption-dave-protocol.md)
<a id="source-establishing-a-voice-udp-connection"></a> <a id="source-example-ready-payload"></a> <a id="source-example-select-protocol-payload"></a>

### Establishing a Voice UDP Connection

 After the [Opcode 2 Ready](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice) payload provides the UDP voice server properties, the last voice-connection step is to create and handshake a UDP connection for voice data.

###### Example Ready Payload

```
{
  "op": 2,
  "d": {
    ...,
    "modes": ["aead_aes256_gcm_rtpsize", "aead_xchacha20_poly1305_rtpsize", "xsalsa20_poly1305_lite_rtpsize"]
  }
}

```

 Begin by opening a UDP connection to the IP and port from the Ready payload. If needed, run [IP Discovery](https://docs.discord.com/developers/topics/voice-connections#ip-discovery) through that connection. Once the external IP and UDP port are known, report them to the voice WebSocket and begin receiving and sending data by using [Opcode 1 Select Protocol](https://docs.discord.com/developers/topics/opcodes-and-status-codes#voice):

###### Example Select Protocol Payload

```
{
  "op": 1,
  "d": {
    "protocol": "udp",
    "data": {
      "address": "127.0.0.1",
      "port": 1337,
      "mode": "aead_aes256_gcm_rtpsize"
    }
  }
}

```


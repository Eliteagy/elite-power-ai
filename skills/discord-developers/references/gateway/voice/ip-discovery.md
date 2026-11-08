# Ip discovery
Context: Discord developer reference: Ip discovery
[Source](voice-transport-and-interpolation-index.md) / [Previous source section](buffered-resume.md)
<a id="source-ip-discovery"></a>

### IP Discovery

 Routers on the Internet commonly hide or rewrite UDP ports through NAT. Most voice implementations should use IP discovery to learn the external IP and port used to receive voice traffic. To obtain that external IP and port, send this UDP packet to the voice port; all numeric values are big endian:
| Field | Description | Size |
| --- | --- | --- |
| Type | 0x1 means request; 0x2 means response | 2 bytes |
| Length | Message length without the Type and Length fields; value is 70 | 2 bytes |
| SSRC | Unsigned integer | 4 bytes |
| Address | Null-terminated string in response | 64 bytes |
| Port | Unsigned short | 2 bytes |

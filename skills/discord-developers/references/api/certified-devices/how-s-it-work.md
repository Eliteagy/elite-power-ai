# How s it work
Context: Discord developer reference: How s it work
[Source](certified-devices-index.md) / [Previous source section](certified-devices.md) / [Following source section](query-string-params.md)
<a id="source-hows-it-work"></a>

### How’s it work?

 I’m glad you asked!
1. [Create an application](https://discord.com/developers/applications) for the hardware vendor, then keep the Client ID.
2. Communicate with Discord through a single HTTP or WebSocket call.
3. Whenever device state changes, send Discord a [`SET_CERTIFIED_DEVICES`](https://docs.discord.com/developers/topics/rpc#setcertifieddevices) WebSocket payload, or make the matching HTTP POST.
 That is the whole flow: provide current information for connected devices, and Discord applies it so people using the hardware get the right experience. Discord audio settings also show a `CERTIFIED` badge for the device. (Figure: An example of how a certified device may be shown for an example audio input and output device)


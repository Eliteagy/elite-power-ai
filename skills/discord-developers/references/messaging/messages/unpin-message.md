# Unpin message
Context: Discord developer reference: Unpin message
[Source](reactions-edits-and-pins-index.md) / [Previous source section](pin-message.md) / [Following source section](get-pinned-messages-deprecated.md)
<a id="source-unpin-message"></a>

### Unpin Message

  Removes a pin from a channel message. The current user needs `PIN_MESSAGES`. Success returns a 204 empty response and emits a [Channel Pins Update](https://docs.discord.com/developers/events/gateway-events#channel-pins-update) Gateway event. The endpoint accepts the `X-Audit-Log-Reason` header.


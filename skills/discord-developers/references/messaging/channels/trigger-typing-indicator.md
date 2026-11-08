# Trigger typing indicator
Context: Discord developer reference: Trigger typing indicator
[Source](invites-permissions-and-threads-index.md) / [Previous source section](follow-announcement-channel.md) / [Following source section](group-dm-add-recipient.md)
<a id="source-trigger-typing-indicator"></a>

### Trigger Typing Indicator

  Show a typing indicator in the specified channel for 10 seconds. A successful call returns an empty 204 response and fires a [Typing Start](https://docs.discord.com/developers/events/gateway-events#typing-start) Gateway event. Bots generally should **not** call this route, except when a command response needs several seconds of processing and the user should see that work is underway.


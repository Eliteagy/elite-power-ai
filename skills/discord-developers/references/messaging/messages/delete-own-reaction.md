# Delete own reaction
Context: Discord developer reference: Delete own reaction
[Source](reactions-edits-and-pins-index.md) / [Previous source section](create-reaction.md) / [Following source section](delete-user-reaction.md)
<a id="source-delete-own-reaction"></a>

### Delete Own Reaction

  Removes the current user's reaction from the message. Success returns a 204 empty response and emits a [Message Reaction Remove](https://docs.discord.com/developers/events/gateway-events#message-reaction-remove) Gateway event. The `emoji` value must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding), or Discord returns `10014: Unknown Emoji`. Custom emoji must be encoded as `name:id`, using the emoji name and emoji id.


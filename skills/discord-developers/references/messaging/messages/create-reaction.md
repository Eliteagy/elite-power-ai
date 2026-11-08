# Create reaction
Context: Discord developer reference: Create reaction
[Source](reactions-edits-and-pins-index.md) / [Previous source section](crosspost-message.md) / [Following source section](delete-own-reaction.md)
<a id="source-create-reaction"></a>

### Create Reaction

  Adds a reaction to the message. The current user must have `READ_MESSAGE_HISTORY`. If this emoji has not already been used as a reaction on the message, the current user also needs `ADD_REACTIONS`. Success returns a 204 empty response and emits a [Message Reaction Add](https://docs.discord.com/developers/events/gateway-events#message-reaction-add) Gateway event. The `emoji` value must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding), or Discord returns `10014: Unknown Emoji`. Custom emoji must be encoded as `name:id`, using the emoji name and emoji id.


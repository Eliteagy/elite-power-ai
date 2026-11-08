# Delete all reactions for emoji
Context: Discord developer reference: Delete all reactions for emoji
[Source](reactions-edits-and-pins-index.md) / [Previous source section](delete-all-reactions.md) / [Following source section](edit-message.md)
<a id="source-delete-all-reactions-for-emoji"></a>

### Delete All Reactions for Emoji

  Removes all reactions for one emoji on a message. The current user must have `MANAGE_MESSAGES`. This emits a [Message Reaction Remove Emoji](https://docs.discord.com/developers/events/gateway-events#message-reaction-remove-emoji) Gateway event. The `emoji` value must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding), or Discord returns `10014: Unknown Emoji`. Custom emoji must be encoded as `name:id`, using the emoji name and emoji id.


# Delete user reaction
Context: Discord developer reference: Delete user reaction
[Source](reactions-edits-and-pins-index.md) / [Previous source section](delete-own-reaction.md) / [Following source section](get-reactions.md)
<a id="source-delete-user-reaction"></a>

### Delete User Reaction

  Removes a reaction made by another user. The current user must have `MANAGE_MESSAGES`. Success returns a 204 empty response and emits a [Message Reaction Remove](https://docs.discord.com/developers/events/gateway-events#message-reaction-remove) Gateway event. The `emoji` value must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding), or Discord returns `10014: Unknown Emoji`. Custom emoji must be encoded as `name:id`, using the emoji name and emoji id.


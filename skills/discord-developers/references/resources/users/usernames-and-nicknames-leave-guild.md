# Usernames and nicknames leave guild
Context: Discord developer reference: Usernames and nicknames leave guild
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](get-current-user-guild-member.md) / [Following source section](usernames-and-nicknames-create-dm.md)
<a id="source-leave-guild"></a>

### Leave Guild

  Makes the current user leave a guild. On success, returns an empty 204 response and fires both a [Guild Delete](https://docs.discord.com/developers/events/gateway-events#guild-delete) Gateway event and a [Guild Member Remove](https://docs.discord.com/developers/events/gateway-events#guild-member-remove) Gateway event.


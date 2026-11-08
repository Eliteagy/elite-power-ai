# Create lobby channel invite for user
Context: Discord developer reference: Create lobby channel invite for user
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](create-lobby-channel-invite-for-self.md) / [Following source section](development-rate-limits.md)
<a id="source-create-lobby-channel-invite-for-user"></a> <a id="source-lobby-invite-object"></a>

### Create Lobby Channel Invite for User

  Generates a single-use guild invite to the lobby's [linked channel](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels) for an application and targets the specified user. The lobby needs a linked channel. After one hour, the invite expires. Authorization uses a `Bot` token. Returns a [lobby invite object](https://docs.discord.com/developers/resources/lobby#lobby-invite-object).

###### Lobby Invite Object

| Field | Type | Description |
| --- | --- | --- |
| code | string | invite code for the lobby's linked channel |


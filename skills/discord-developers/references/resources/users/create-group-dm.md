# Create group dm
Context: Discord developer reference: Create group dm
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames-create-dm.md) / [Following source section](get-current-user-connections.md)
<a id="source-create-group-dm"></a> <a id="source-json-params-2"></a>

### Create Group DM

  Creates a group DM channel with multiple users and returns a [DM channel](https://docs.discord.com/developers/resources/channel#channel-object) object. The endpoint was designed for the now-deprecated GameBridge SDK. It fires a [Channel Create](https://docs.discord.com/developers/events/gateway-events#channel-create) Gateway event and is capped at 10 active group DMs.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| access_tokens | array of strings | access tokens for users who granted your app the `gdm.join` scope |
| nicks | dict | a dictionary mapping user ids to their nicknames |


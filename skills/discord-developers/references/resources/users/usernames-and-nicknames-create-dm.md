# Usernames and nicknames create dm
Context: Discord developer reference: Usernames and nicknames create dm
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames-leave-guild.md) / [Following source section](create-group-dm.md)
<a id="source-create-dm"></a> <a id="source-json-params-1"></a>

### Create DM

  Creates a DM channel with a user and returns the [DM channel](https://docs.discord.com/developers/resources/channel#channel-object) object; if the channel already exists, the existing one is returned. Do not use this endpoint to message every server member. A DM should usually follow a user action, and opening many DMs quickly can cause the bot to be rate limited or blocked from opening more.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| recipient_id | snowflake | the recipient user for the DM channel |


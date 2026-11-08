# Overwrite object
Context: Discord developer reference: Overwrite object
[Source](channel-objects-and-settings-index.md) / [Previous source section](followed-channel-structure.md) / [Following source section](thread-metadata-object.md)
<a id="source-overwrite-object"></a> <a id="source-overwrite-structure"></a>

### Overwrite Object

 For details on the `allow` and `deny` fields, see [permissions](https://docs.discord.com/developers/topics/permissions#permissions).

###### Overwrite Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | role or user id |
| type | int | either 0 (role) or 1 (member) |
| allow | string | permission bit set |
| deny | string | permission bit set |


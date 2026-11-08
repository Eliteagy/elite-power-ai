# Usernames and nicknames nameplate
Context: Discord developer reference: Usernames and nicknames nameplate
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames-collectibles.md) / [Following source section](usernames-and-nicknames-connection-object.md)
<a id="source-nameplate"></a> <a id="source-nameplate-structure"></a>

### Nameplate

 The nameplate the user has.

###### Nameplate Structure

| Field | Type | Description |
| --- | --- | --- |
| sku_id | snowflake | id of the nameplate SKU |
| asset | string | path to the nameplate asset |
| label | string | the nameplate label. Currently unused |
| palette | string | nameplate background color; one of: `crimson`, `berry`, `sky`, `teal`, `forest`, `bubble_gum`, `violet`, `cobalt`, `clover`, `lemon`, `white` |


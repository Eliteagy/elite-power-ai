# Invite metadata object
Context: Discord developer reference: Invite metadata object
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](example-invite-object.md) / [Following source section](invite-stage-instance-object.md)
<a id="source-invite-metadata-object"></a> <a id="source-invite-metadata-structure"></a> <a id="source-example-invite-metadata"></a>

### Invite Metadata Object

 Additional invite information that extends the [invite](https://docs.discord.com/developers/resources/invite#invite-object) object.

###### Invite Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| uses | integer | how many times this invite has been used |
| max_uses | integer | maximum number of allowed uses for this invite |
| max_age | integer | duration in seconds before the invite expires |
| temporary | boolean | whether the invite grants only temporary membership |
| created_at | ISO8601 timestamp | when this invite was created |

###### Example Invite Metadata

```
{
  "uses": 0,
  "max_uses": 0,
  "max_age": 0,
  "temporary": false,
  "created_at": "2016-03-31T19:15:39.954000+00:00"
}

```


# Stage instance structure
Context: Discord developer reference: Stage instance structure
[Source](../../resources/polls-stage-instances-and-skus-index.md) / [Owning endpoint, event, object or procedure conditions](stage-instance-object.md) / [Following source section](stage-instance-object-definitions.md)
<a id="source-stage-instance-object-1"></a> <a id="source-stage-instance-structure"></a> <a id="source-privacy-level"></a> <a id="source-example-stage-instance"></a>

### Stage Instance Object

###### Stage Instance Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of this Stage instance |
| guild_id | snowflake | guild id for the related Stage channel |
| channel_id | snowflake | id of the related Stage channel |
| topic | string | Stage instance topic (1-120 characters) |
| privacy_level | integer | Stage instance privacy level |
| discoverable_disabled | boolean | whether Stage Discovery is disabled (deprecated) |
| guild_scheduled_event_id | ?snowflake | scheduled event id for this Stage instance |

###### Privacy Level

| Level | Value | Description |
| --- | --- | --- |
| PUBLIC | 1 | The Stage instance is publicly visible. (deprecated) |
| GUILD_ONLY | 2 | The Stage instance is visible only to guild members. |

###### Example Stage Instance

```
{
  "id": "840647391636226060",
  "guild_id": "197038439483310086",
  "channel_id": "733488538393510049",
  "topic": "Testing Testing, 123",
  "privacy_level": 1,
  "discoverable_disabled": false,
  "guild_scheduled_event_id": "947656305244532806"
}

```


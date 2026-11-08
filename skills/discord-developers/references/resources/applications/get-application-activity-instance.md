# Get application activity instance
Context: Discord developer reference: Get application activity instance
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Previous source section](edit-current-application.md) / [Following source section](application-role-connection-metadata-object.md)
<a id="source-get-application-activity-instance"></a> <a id="source-example-activity-instance"></a> <a id="source-activity-instance-object"></a> <a id="source-activity-location-object"></a> <a id="source-activity-location-kind-enum"></a>

### Get Application Activity Instance

  Returns a serialized activity instance when one exists. This can help with [preventing unwanted activity sessions](https://docs.discord.com/developers/activities/development-guides/multiplayer-experience#preventing-unwanted-activity-sessions).

###### Example Activity Instance

```
{
  "application_id": "1215413995645968394",
  "instance_id": "i-1276580072400224306-gc-912952092627435520-912954213460484116",
  "launch_id": "1276580072400224306",
  "location": {
    "id": "gc-912952092627435520-912954213460484116",
    "kind": "gc",
    "channel_id": "912954213460484116",
    "guild_id": "912952092627435520"
  },
  "users": ["205519959982473217"],
}

```

###### Activity Instance Object

| Field | Type | Description |
| --- | --- | --- |
| application_id | snowflake | Application ID |
| instance_id | string | Activity Instance ID |
| launch_id | snowflake | Unique identifier for the launch |
| location | Activity Location | Location where the instance is running |
| users | array of snowflakes, user IDs | IDs for Users currently connected to the instance |

###### Activity Location Object

 The Activity Location object describes where an activity instance is running.
| Field | Type | Description |
| --- | --- | --- |
| id | string | Unique identifier for the location |
| kind | Activity Location Kind Enum | Enum describing kind of location |
| channel_id | snowflake | ID of the Channel |
| guild_id? | ?snowflake | ID of the Guild |

###### Activity Location Kind Enum

| Enum | Description |
| --- | --- |
| ’gc’ | Location is a Guild Channel |
| ’pc’ | Location is a Private Channel, such as a DM or GDM |


# Incidents data structure
Context: Discord developer reference: Incidents data structure
[Source](guild-members-and-ban-endpoints-index.md) / [Previous source section](membership-screening-object.md) / [Following source section](get-guild.md)
<a id="source-incidents-data-object"></a> <a id="source-incidents-data-structure"></a> <a id="source-example-incidents-data"></a>

### Incidents Data Object

###### Incidents Data Structure

| Field | Type | Description |
| --- | --- | --- |
| invites_disabled_until | ?ISO8601 timestamp | when invites get enabled again |
| dms_disabled_until | ?ISO8601 timestamp | timestamp for once direct messages get enabled again |
| dm_spam_detected_at? | ?ISO8601 timestamp | timestamp for once the dm spam was detected |
| raid_detected_at? | ?ISO8601 timestamp | when the raid was detected |

###### Example Incidents Data

```
{
  "invites_disabled_until": "2023-09-01T14:48:02.222000+00:00",
  "dms_disabled_until": null
}

```


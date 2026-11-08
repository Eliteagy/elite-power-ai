# Using the activity instance API
Context: Discord developer reference: Using the activity instance API
[Source](participants-avatars-and-lifecycle-index.md) / [Owning endpoint, event, object or procedure conditions](activity-instance-management.md) / [Previous source section](preventing-unwanted-activity-sessions.md) / [Following source section](validating-proxy-request-headers.md)
<a id="source-using-the-activity-instance-api"></a>

### Using the Activity Instance API

 To restrict activity access, use the `get_activity_instance` API at `discord.com/api/applications/<application_id>/activity-instances/<instance_id>'`. The route requires the application's Bot token. If the active activity instance exists for that application, the API returns a serialized representation; otherwise it returns 404. Two example responses follow:

```
curl https://discord.com/api/applications/1215413995645968394/activity-instances/i-1234567890-gc-912952092627435520-912954213460484116 -H 'Authorization: Bot <bot token>'
{"message": "404: Not Found", "code": 0}

curl https://discord.com/api/applications/1215413995645968394/activity-instances/i-1276580072400224306-gc-912952092627435520-912954213460484116 -H 'Authorization: Bot <bot token>'
{"application_id":"1215413995645968394","instance_id":"i-1276580072400224306-gc-912952092627435520-912954213460484116","launch_id":"1276580072400224306","location":{"id":"gc-912952092627435520-912954213460484116","kind":"gc","channel_id":"912954213460484116","guild_id":"912952092627435520"},"users":["205519959982473217"]}

```

 This API lets the activity backend confirm that a client really belongs to an instance of that activity before enabling meaningful gameplay. The exact `session verification` design is up to the developer; it can guard individual features or block serving the activity HTML unless the session is valid.


# Presence presence update
Context: Discord developer reference: Presence presence update
[Source](reaction-presence-and-user-events-index.md) / [Previous source section](message-reaction-remove-emoji.md) / [Following source section](client-status-object.md)
<a id="source-presence"></a> <a id="source-presence-update"></a> <a id="source-presence-update-event-fields"></a>

### Presence

#### Presence Update

 When using [Gateway Intents](https://docs.discord.com/developers/events/gateway#gateway-intents), Presence Update events require the `GUILD_PRESENCES` intent. Presence represents a user's current guild state, and this event fires when that state or user information such as name or avatar changes. The embedded user object may be partial; only `id` is guaranteed, and all other fields are optional. No field is required beyond that, and field types are **not** validated, so clients must tolerate any field/type combination.

###### Presence Update Event Fields

| Field | Type | Description |
| --- | --- | --- |
| user | user object | User record for the presence change. |
| guild_id | snowflake | ID of the guild |
| status | string | One of "idle", "dnd", "online", or "offline". |
| activities | array of activity objects | User’s current activities |
| client_status | client_status object | User’s platform-dependent status |


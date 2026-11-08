# Modify guild incident actions
Context: Discord developer reference: Modify guild incident actions
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](modify-guild-onboarding.md)
<a id="source-modify-guild-incident-actions"></a> <a id="source-json-params-5"></a>

### Modify Guild Incident Actions

  Update guild incident actions. A successful call returns `200` with the guild [Incidents Data](https://docs.discord.com/developers/resources/guild#incidents-data-object) object. The request requires `MANAGE_GUILD`.

###### JSON Params

 Both `invites_disabled_until` and `dms_disabled_until` may be set no later than 24 hours ahead.
| Field | Type | Description |
| --- | --- | --- |
| invites_disabled_until? | ?ISO8601 timestamp * | timestamp when invites become enabled again |
| dms_disabled_until? | ?ISO8601 timestamp * | timestamp when direct messages become enabled again |

 * Supplying `null` disables the action.

# Modify guild onboarding
Context: Discord developer reference: Modify guild onboarding
[Source](roles-pruning-and-guild-settings-index.md) / [Previous source section](get-guild-onboarding.md) / [Following source section](modify-guild-incident-actions.md)
<a id="source-modify-guild-onboarding"></a> <a id="source-json-params-4"></a>

### Modify Guild Onboarding

  Update the guild onboarding configuration. The response is a `200` with the guild [Onboarding](https://docs.discord.com/developers/resources/guild#guild-onboarding-object) object. The caller must have `MANAGE_GUILD` and `MANAGE_ROLES`. Enabled onboarding applies constraints: at least 7 Default Channels must exist, and at least 5 of those channels must allow the @everyone role to send messages. The `mode` field changes what is evaluated for these constraints. `X-Audit-Log-Reason` is supported, and every parameter is optional.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| prompts | array of onboarding prompt objects | prompts displayed during onboarding and customize community |
| default_channel_ids | array of snowflakes | channel IDs that members are automatically opted into |
| enabled | boolean | whether guild onboarding is active |
| mode | onboarding mode | Current mode of onboarding |


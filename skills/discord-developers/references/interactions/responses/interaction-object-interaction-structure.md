# Interaction object interaction structure
Context: Discord developer reference: Interaction object interaction structure
[Source](interaction-objects-and-responses-index.md) / [Previous source section](receiving-and-responding.md) / [Following source section](application-command-data-structure.md)
<a id="source-interaction-object"></a> <a id="source-interaction-structure"></a> <a id="source-interaction-type"></a> <a id="source-interaction-context-types"></a> <a id="source-authorizing-integration-owners-object"></a> <a id="source-interaction-data"></a>

### Interaction Object

###### Interaction Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the interaction |
| application_id | snowflake | Application ID associated with this interaction |
| type | interaction type | Type of interaction |
| data?* | interaction data | Interaction data payload |
| guild? | partial guild object | Guild where this interaction originated |
| guild_id? | snowflake | Guild where this interaction originated |
| channel? | partial channel object | Channel where this interaction originated |
| channel_id? | snowflake | Channel where this interaction originated |
| member?** | guild member object | Guild member information for the user who invoked it, permissions included |
| user? | user object | User object for the invoker when the interaction happens in a DM |
| token | string | Token used to continue responding to this interaction |
| version | integer | Read-only property, always `1` |
| message? | message object | For components, and modals opened from components, the attached message |
| app_permissions*** | string | Bitfield containing the app permissions in the location that produced the interaction |
| locale?**** | string | Locale selected by the user who invoked the interaction |
| guild_locale? | string | Preferred locale for the guild, when the interaction is from a guild |
| entitlements | array of entitlement objects | For monetized apps, entitlements owned by the invoking user that represent premium SKU access |
| authorizing_integration_owners | dictionary keyed by application integration types | Maps authorized installation contexts for this interaction to the relevant user or guild IDs. See Authorizing Integration Owners Object for details |
| context? | interaction context type | Context from which the interaction was triggered |
| attachment_size_limit | integer | Attachment size limit in bytes |

 * Present for application command, message component, and modal submit interaction types; optional so later interaction types can omit it ** `member` appears for guild invocations, while `user` appears for DM invocations *** In (G)DMs with other users, `app_permissions` includes `ATTACH_FILES | EMBED_LINKS | MENTION_EVERYONE`; DMs with the app's bot user also include `USE_EXTERNAL_EMOJIS` **** Present on every interaction type except PING

###### Interaction Type

| Name | Value |
| --- | --- |
| PING | 1 |
| APPLICATION_COMMAND | 2 |
| MESSAGE_COMPONENT | 3 |
| APPLICATION_COMMAND_AUTOCOMPLETE | 4 |
| MODAL_SUBMIT | 5 |

###### Interaction Context Types

 Discord context where an interaction is allowed or where it was initiated. For application-command usage, see the [commands context documentation](https://docs.discord.com/developers/interactions/application-commands#interaction-contexts).
| Name | Type | Description |
| --- | --- | --- |
| GUILD | 0 | Interaction is available in servers |
| BOT_DM | 1 | Interaction is available in DMs with the app's bot user |
| PRIVATE_CHANNEL | 2 | Interaction is available in Group DMs and DMs that are not with the app's bot user |

###### Authorizing Integration Owners Object

 The `authorizing_integration_owners` field identifies the authorizing user or guild for the installation or installations tied to the interaction. For user-installed apps, it can distinguish the user who authorized the app from the user who triggered the interaction, such as with a message component. A key appears only when all of these conditions hold:
- The app is authorized for the [installation context](https://docs.discord.com/developers/resources/application#application-object-application-integration-types) represented by that key (`GUILD_INSTALL` or `USER_INSTALL`)
- The source [interaction context](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-context-types) (`GUILD`, `BOT_DM`, or `PRIVATE_CHANNEL`) supports the interaction for the installation context represented by that key
- For command invocations, the command also supports that installation context through [`integration_types`](https://docs.discord.com/developers/interactions/application-commands#contexts)
 Values in `authorizing_integration_owners` are determined by the key:
- For `GUILD_INSTALL` (`"0"`), the value changes based on where the interaction came from:
  - If the interaction is from a server, the value is that guild ID
  - If the interaction is from a DM with the app's bot user, the value is `"0"`

- For `USER_INSTALL` (`"1"`), the value is the authorizing user's ID

###### Interaction Data

 The `data` field is present for every [interaction type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-type) except `PING`, but its shape depends on the type. The tables below describe each interaction type's inner `data` payload.
| Interaction Type | Interaction Data |
| --- | --- |
| PING (`1`) | N / A |
| APPLICATION_COMMAND (`2`) | Application Command Data Structure |
| MESSAGE_COMPONENT (`3`) | Message Component Data Structure |
| APPLICATION_COMMAND_AUTOCOMPLETE (`4`) | Application Command Data Structure |
| MODAL_SUBMIT (`5`) | Modal Submit Data Structure |


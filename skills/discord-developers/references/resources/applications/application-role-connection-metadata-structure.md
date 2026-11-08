# Application role connection metadata structure
Context: Discord developer reference: Application role connection metadata structure
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-role-connection-metadata-object.md) / [Following source section](get-application-role-connection-metadata-records.md)
<a id="source-application-role-connection-metadata-object-1"></a> <a id="source-application-role-connection-metadata-structure"></a> <a id="source-application-role-connection-metadata-type"></a>

### Application Role Connection Metadata Object

###### Application Role Connection Metadata Structure

| Field | Type | Description |
| --- | --- | --- |
| type | ApplicationRoleConnectionMetadataType | type of metadata value |
| key | string | dictionary key for the metadata field; allowed characters are `a-z`, `0-9`, or `_`, with 1-50 characters |
| name | string | metadata field name, with 1-100 characters |
| name_localizations? | dictionary keyed by available locales | translations of the name |
| description | string | metadata field description, with 1-200 characters |
| description_localizations? | dictionary keyed by available locales | translations of the description |

###### Application Role Connection Metadata Type

| Type | Value | Description |
| --- | --- | --- |
| INTEGER_LESS_THAN_OR_EQUAL | 1 | compares whether the metadata value (`integer`) is at most the guild's configured value (`integer`) |
| INTEGER_GREATER_THAN_OR_EQUAL | 2 | compares whether the metadata value (`integer`) is at least the guild's configured value (`integer`) |
| INTEGER_EQUAL | 3 | the metadata value (`integer`) equals the guild's configured value (`integer`) |
| INTEGER_NOT_EQUAL | 4 | the metadata value (`integer`) differs from the guild's configured value (`integer`) |
| DATETIME_LESS_THAN_OR_EQUAL | 5 | checks whether the metadata value (`ISO8601 string`) is no later than the guild's configured value (`integer`; `days before current date`) |
| DATETIME_GREATER_THAN_OR_EQUAL | 6 | checks whether the metadata value (`ISO8601 string`) is no earlier than the guild's configured value (`integer`; `days before current date`) |
| BOOLEAN_EQUAL | 7 | the metadata value (`integer`) equals the guild's configured value (`integer`; `1`) |
| BOOLEAN_NOT_EQUAL | 8 | the metadata value (`integer`) differs from the guild's configured value (`integer`; `1`) |

 Each metadata type defines a comparison operation that guilds can use when setting role requirements from metadata values stored by the bot. Bots store a `metadata value` per user, and guilds set the required `guild's configured value` in the guild role settings.


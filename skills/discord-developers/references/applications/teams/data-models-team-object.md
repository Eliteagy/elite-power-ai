# Data models team object
Context: Discord developer reference: Data models team object
[Source](teams-index.md) / [Previous source section](team-member-roles.md)
<a id="source-data-models"></a> <a id="source-team-object"></a> <a id="source-team-member-object"></a> <a id="source-membership-state-enum"></a>

### Data Models

###### Team Object

| field | type | description |
| --- | --- | --- |
| icon | ?string | Icon image hash for the team |
| id | snowflake | Unique ID of the team |
| members | array of team member objects | Members of the team |
| name | string | Name of the team |
| owner_user_id | snowflake | Current owner's user ID for the team |

###### Team Member Object

| field | type | description |
| --- | --- | --- |
| membership_state | integer | The user's team membership state |
| team_id | snowflake | ID of the team that contains this member |
| user | partial user object | The user's avatar, discriminator, ID, and username |
| role | string | Role of the team member |

###### Membership State Enum

| name | value |
| --- | --- |
| INVITED | 1 |
| ACCEPTED | 2 |

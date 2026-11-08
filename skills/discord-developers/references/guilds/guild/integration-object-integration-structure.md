# Integration object integration structure
Context: Discord developer reference: Integration object integration structure
[Source](guild-objects-and-configuration-index.md) / [Previous source section](guild-member-structure.md) / [Following source section](integration-account-structure.md)
<a id="source-integration-object"></a> <a id="source-integration-structure"></a> <a id="source-integration-expire-behaviors"></a>

### Integration Object

###### Integration Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | integration id |
| name | string | integration name |
| type | string | integration type (twitch, youtube, discord, or guild_subscription) |
| enabled | boolean | is this integration enabled |
| syncing? * | boolean | is this integration syncing |
| role_id? * | snowflake | id that this integration uses for “subscribers” |
| enable_emoticons? * | boolean | Indicates whether emoticons must be synced for this integration (twitch only currently) |
| expire_behavior? * | integration expire behavior | the behavior of expiring subscribers |
| expire_grace_period? * | integer | Grace period (in days) before expiring subscribers |
| user? | user object | user for this integration |
| account | account object | integration account information |
| synced_at? * | ISO8601 timestamp | timestamp for once this integration was last synced |
| subscriber_count? * | integer | how many subscribers this integration has |
| revoked? * | boolean | has this integration been revoked |
| application? | application object | The bot/OAuth2 application for discord integrations |
| scopes? | array of OAuth2 scopes | Scopes the application has been authorized for |

 * The current fields remain not provided for discord bot integrations. Some older integrations may not have one attached user.

###### Integration Expire Behaviors

| Value | Name |
| --- | --- |
| 0 | Remove role |
| 1 | Kick |


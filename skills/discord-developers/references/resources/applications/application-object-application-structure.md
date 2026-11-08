# Application object application structure
Context: Discord developer reference: Application object application structure
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Following source section](example-application-object.md)
<a id="source-application-object-1"></a> <a id="source-application-structure"></a>

### Application Object

###### Application Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the app |
| name | string | Name of the app |
| icon | ?string | Icon hash of the app |
| description | string | Description of the app |
| rpc_origins? | array of strings | RPC origin URL list, present when RPC is enabled |
| bot_public | boolean | When `false`, guild installation is limited to the app owner |
| bot_require_code_grant | boolean | When `true`, the app's bot joins only after the full OAuth2 code grant flow completes |
| bot? | partial user object | Partial user object for the app's associated bot user |
| terms_of_service_url? | string | URL for the app's Terms of Service |
| privacy_policy_url? | string | URL for the app's Privacy Policy |
| owner? | partial user object | Partial user object for the app owner |
| verify_key | string | Hex-encoded key used to verify interactions and the GameSDK's GetTicket |
| team | ?team object | Team member list when the app is owned by a team |
| guild_id? | snowflake | Guild linked to the app, such as a developer support server |
| guild? | partial guild object | Partial object for the linked guild |
| primary_sku_id? | snowflake | For a game sold on Discord, this is the id of the created "Game SKU" when one exists |
| slug? | string | For a game sold on Discord, this is the URL slug for its store page |
| cover_image? | string | App’s default rich presence invite cover image hash |
| flags? | integer | App’s public flags |
| approximate_guild_count? | integer | Approximate number of guilds where the app has been added |
| approximate_user_install_count? | integer | Approximate number of users who installed the app by authorizing the `application.commands` scope |
| approximate_user_authorization_count? | integer | Approximate number of users with OAuth2 authorizations for the app |
| redirect_uris? | array of strings | Redirect URI array for the app |
| interactions_endpoint_url? | ?string | Interactions endpoint URL for the app |
| role_connections_verification_url? | ?string | Role connection verification URL for the app |
| event_webhooks_url? | ?string | Event webhooks URL where the app receives webhook events |
| event_webhooks_status? | application event webhook status | Webhook event status for the app: `1` (default) is disabled, `2` is enabled, and `3` is disabled by Discord |
| event_webhooks_types? | array of strings | Webhook event types subscribed to by the app |
| tags? | array of strings | Tags that describe the app's content and features. Max of 5 tags. |
| install_params? | install params object | Settings for the app's default in-app authorization link, when enabled |
| integration_types_config? | dictionary keyed by application integration types | Default scopes and permissions for each supported installation context. Each key maps to an integration type configuration object |
| custom_install_url? | string | Default custom authorization URL for the app, when enabled |


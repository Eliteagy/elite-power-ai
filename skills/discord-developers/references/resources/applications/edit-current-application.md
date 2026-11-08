# Edit current application
Context: Discord developer reference: Edit current application
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Previous source section](get-current-application.md) / [Following source section](get-application-activity-instance.md)
<a id="source-edit-current-application"></a> <a id="source-json-params"></a>

### Edit Current Application

  Updates properties on the app tied to the requesting bot user. Only supplied properties are changed. On success, returns the updated [application](https://docs.discord.com/developers/resources/application#application-object) object. Every parameter for this endpoint is optional.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| custom_install_url | string | Default custom authorization URL for the app, when enabled |
| description | string | Description of the app |
| role_connections_verification_url | string | Role connection verification URL for the app |
| install_params | install params object | Settings for the app's default in-app authorization link, when enabled |
| integration_types_config | dictionary keyed by application integration types | Default scopes and permissions for each supported installation context. Each key maps to an integration type configuration object |
| flags * | integer | App’s public flags |
| icon | ?image data | Icon for the app |
| cover_image | ?image data | Default rich presence invite cover image for the app |
| interactions_endpoint_url ** | string | Interactions endpoint URL for the app |
| tags | array of strings | Tags that describe the app's content and features, with a max of 20 characters per tag. Max of 5 tags. |
| event_webhooks_url | string | Event webhooks URL where the app receives webhook events |
| event_webhooks_status | application event webhook status | Webhook event setting for the app: `1` disables events and `2` enables them |
| event_webhooks_types | array of strings | Webhook event types to subscribe to |

 * The API can update only limited intent flags (`GATEWAY_PRESENCE_LIMITED`, `GATEWAY_GUILD_MEMBERS_LIMITED`, and `GATEWAY_MESSAGE_CONTENT_LIMITED`). ** Updating an Interactions endpoint URL through the API requires a URL that is valid under the [Receiving an Interaction](https://docs.discord.com/developers/interactions/receiving-and-responding#receiving-an-interaction) rules.


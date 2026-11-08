# Application event webhook status
Context: Discord developer reference: Application event webhook status
[Source](application-objects-and-endpoints-index.md) / [Owning endpoint, event, object or procedure conditions](application-object.md) / [Owning endpoint, event, object or procedure conditions](application-object-application-structure.md) / [Previous source section](example-application-object.md) / [Following source section](install-params-structure.md)
<a id="source-application-event-webhook-status"></a> <a id="source-application-flags"></a>

###### Application Event Webhook Status

 Status value showing whether event webhooks are enabled or disabled for an application.
| Name | Value | Description |
| --- | --- | --- |
| `DISABLED` | `1` | Webhook events disabled by the developer |
| `ENABLED` | `2` | Webhook events enabled by the developer |
| `DISABLED_BY_DISCORD` | `3` | Webhook events disabled by Discord, commonly because of inactivity |

###### Application Flags

 The `flags` field is serialized as a number, but it will not exceed 31 bits. Any new flag bits beyond bit 30 appear only in `flags_new`, a string-serialized integer that contains the complete flag bit set. Existing integrations that read `flags` keep working. `flags_new` is only for response serialization; requests that accept flag values should continue using `flags`.
| Value | Name | Description |
| --- | --- | --- |
| `1 << 6` | APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE | Shows whether an app uses the Auto Moderation API |
| `1 << 12` | GATEWAY_PRESENCE | Intent required for bots in **100 or more servers** to receive `presence_update` events |
| `1 << 13` | GATEWAY_PRESENCE_LIMITED | Intent required for bots in fewer than 100 servers to receive `presence_update` events, configured on the **Bot** page in the app's settings |
| `1 << 14` | GATEWAY_GUILD_MEMBERS | Bots in **100 or more servers** need this intent for member events such as `guild_member_add`. See member-related events under `GUILD_MEMBERS` |
| `1 << 15` | GATEWAY_GUILD_MEMBERS_LIMITED | Intent required for bots in fewer than 100 servers to receive member-related events such as `guild_member_add`, configured on the **Bot** page in the app's settings. See member-related events under `GUILD_MEMBERS` |
| `1 << 16` | VERIFICATION_PENDING_GUILD_LIMIT | Shows unusual app growth that blocks verification |
| `1 << 17` | EMBEDDED | Shows whether an app is embedded inside the Discord client; this is currently not publicly available |
| `1 << 18` | GATEWAY_MESSAGE_CONTENT | Bots in **100 or more servers** need this intent before they receive message content |
| `1 << 19` | GATEWAY_MESSAGE_CONTENT_LIMITED | Intent required for bots in fewer than 100 servers to receive message content, configured on the **Bot** page in the app's settings |
| `1 << 23` | APPLICATION_COMMAND_BADGE | Shows whether an app has registered global application commands |


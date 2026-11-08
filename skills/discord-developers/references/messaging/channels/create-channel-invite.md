# Create channel invite
Context: Discord developer reference: Create channel invite
[Source](invites-permissions-and-threads-index.md) / [Previous source section](get-channel-invites.md) / [Following source section](delete-channel-permission.md)
<a id="source-create-channel-invite"></a> <a id="source-jsonform-params"></a>

### Create Channel Invite

  Create a channel [invite](https://docs.discord.com/developers/resources/invite#invite-object). The route is limited to guild channels and requires `CREATE_INSTANT_INVITE`. All JSON parameters are optional, but the body itself is required; send an empty JSON object (`{}`) when no fields are provided. The response is an [invite](https://docs.discord.com/developers/resources/invite#invite-object) object, and Discord fires an [Invite Create](https://docs.discord.com/developers/events/gateway-events#invite-create) Gateway event. `X-Audit-Log-Reason` is supported.

###### JSON/Form Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| max_age | integer | Invite lifetime in seconds before expiration, or 0 for no expiration; valid range is 0 through 604800 (7 days). | 86400 (24 hours) |
| max_uses | integer | Maximum use count, or 0 for unlimited use; valid range is 0 through 100. | 0 |
| temporary | boolean | Whether the invite grants only temporary membership. | false |
| unique | boolean | When true, Discord should not reuse a similar invite; useful when generating many unique one-time-use invites. | false |
| target_type | integer | Target type for this voice channel invite. |  |
| target_user_id | snowflake | ID of the user whose stream should appear for this invite. Required when `target_type` is 1, and that user must be streaming in the channel. |  |
| target_application_id | snowflake | ID of the embedded application opened by this invite. Required when `target_type` is 2, and the application must include the `EMBEDDED` flag. |  |
| target_users_file?* | file | CSV file containing one column of user IDs for users allowed to accept the invite. |  |
| payload_json? | string | JSON-encoded non-file parameter body, used only with `multipart/form-data` requests. |  |
| role_ids?** | array of snowflakes | Role ID(s) for guild roles assigned to users who accept the invite. |  |

 * Use `multipart/form-data` as the content type, with other parameters included as form fields in the multipart body. Uploads containing invalid user IDs return 400 and identify those IDs. Duplicate user IDs in the file are ignored. ** Requires `MANAGE_ROLES`, and the sender cannot assign roles whose permissions exceed their own.


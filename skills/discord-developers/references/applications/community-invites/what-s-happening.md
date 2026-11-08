# What s happening
[Source](using-community-invites-index.md) / [Previous source section](player-role-invite-example.md) / [Following source section](testing-it-out.md)

<a id="source-whats-happening"></a>

### What’s Happening

1. **`role_ids` array**: Holds the Discord role IDs applied when someone accepts the invite. The example uses one role, but the array can contain multiple roles.
2. **Response**: Provides an invite object containing a shareable `code`

<a id="source-whats-happening-1"></a>

### What’s Happening

1. **`target_users_file`**: CSV content containing the Discord user IDs for paying supporters. Only those users can view and accept the invite.
2. **`role_ids` array**: Automatically applies the **Supporter** role, which grants access to exclusive channels
3. **FormData**: Needed for file uploads; place the remaining parameters inside `payload_json`
 Use `Content-Type: application/json` when sending only JSON parameters such as `role_ids`. If the request uploads `target_users_file`, send it as `multipart/form-data`.

# Update target users
Context: Discord developer reference: Update target users
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](get-target-users.md) / [Following source section](get-target-users-job-status.md)
<a id="source-update-target-users"></a> <a id="source-form-params"></a> <a id="source-example-error-response"></a>

### Update Target Users

 PUT/invites/[{invite.code}](https://docs.discord.com/developers/resources/invite#invite-object)/target-users Replaces the users allowed to view and accept the invite. If the uploaded file has invalid user IDs, the response is a 400 that lists those invalid IDs. The caller must be the inviter or have `MANAGE_GUILD`.

###### Form Params

| Field | Type | Description |
| --- | --- | --- |
| target_users_file | file | CSV file with one user ID column listing every user allowed to accept this invite |

###### Example Error Response

```
{
  "target_users_file": [
    "Line 5: invalid user ID - must be a valid Discord snowflake",
    "Line 6: invalid user ID format"
  ]
}

```


# Get target users job status
Context: Discord developer reference: Get target users job status
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](invite-object.md) / [Previous source section](update-target-users.md) / [Following source section](../lobbies/lobby-object.md)
<a id="source-get-target-users-job-status"></a> <a id="source-example-response"></a> <a id="source-status-codes"></a>

### Get Target Users Job Status

 GET/invites/[{invite.code}](https://docs.discord.com/developers/resources/invite#invite-object)/target-users/job-status CSV processing for target users during invite creation or update is asynchronous. This endpoint reports that job's status. The caller must be the inviter, have `MANAGE_GUILD`, or have `VIEW_AUDIT_LOG`.

###### Example Response

```
{
  "status": 3,
  "total_users": 100,
  "processed_users": 41,
  "created_at": "2025-01-08T12:00:00.000000+00:00",
  "completed_at": null,
  "error_message": "Failed to parse CSV file"
}

```

###### Status Codes

| Code | Name | Description |
| --- | --- | --- |
| 0 | UNSPECIFIED | The default value. |
| 1 | PROCESSING | The job is currently processing. |
| 2 | COMPLETED | The job completed successfully. |
| 3 | FAILED | The job failed; inspect `error_message` for details. |


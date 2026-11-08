# Access payload permission and validation codes
Context: Discord JSON error-code reference; preserve code meanings and linked response interpretation.
[Source](gateway-http-and-api-status-index.md) / [Response code/message/errors interpretation](json.md) / [Previous source section](authorization-account-and-resource-state-codes.md) / [Following source section](feature-specific-error-codes.md)

| Code | Meaning |
| --- | --- |
| 50001 | Missing access |
| 50002 | Invalid account type |
| 50003 | Actions cannot be executed on a DM channel. |
| 50004 | Guild widget disabled |
| 50005 | A message authored by another user cannot be edited. |
| 50006 | Cannot send an empty message |
| 50007 | Messages cannot be sent to this user. |
| 50008 | Messages cannot be sent in a non-text channel. |
| 50009 | The channel verification level is too high to allow access. |
| 50010 | The OAuth2 application has no bot. |
| 50011 | OAuth2 application limit reached |
| 50012 | Invalid OAuth2 state |
| 50013 | Required permissions are missing for that action. |
| 50014 | Invalid authentication token provided |
| 50015 | Note was too long |
| 50016 | The delete request included too few or too many messages. Provide at least 2 and fewer than 100 messages. |
| 50017 | Invalid MFA Level |
| 50019 | A message can be pinned only in the channel where it was sent. |
| 50020 | The invite code is invalid or already taken. |
| 50021 | Actions cannot be executed on a system message. |
| 50024 | Actions cannot be executed on this channel type. |
| 50025 | Invalid OAuth2 access token provided |
| 50026 | Missing required OAuth2 scope |
| 50027 | Invalid webhook token provided |
| 50028 | Invalid role |
| 50033 | Invalid Recipient(s) |
| 50034 | One supplied message is too old for bulk delete. |
| 50035 | The form body is invalid for `application/json` or `multipart/form-data`, or the supplied `Content-Type` is invalid. |
| 50036 | The invite was accepted for a guild that does not contain the application's bot. |
| 50039 | Invalid Activity Action |
| 50041 | Invalid API version provided |
| 50045 | The uploaded file is larger than the maximum size. |
| 50046 | Invalid file uploaded |
| 50054 | Cannot self-redeem this gift |
| 50055 | Invalid Guild |
| 50057 | Invalid SKU |
| 50067 | Invalid request origin |
| 50068 | Invalid message type |
| 50070 | A payment source is required to redeem the gift. |
| 50073 | Cannot modify a system webhook |
| 50074 | A channel required for Community guilds cannot be deleted. |
| 50080 | Stickers inside a message cannot be edited. |
| 50081 | Invalid sticker sent |
| 50083 | The operation targeted an archived thread, such as editing a message or adding a user. |
| 50084 | Invalid thread notification settings |
| 50085 | The `before` value predates thread creation. |
| 50086 | Community server channels are required to be text channels. |
| 50091 | The event entity type does not match the entity being used to start the event. |
| 50095 | This server is unavailable in your location. |
| 50097 | This server must have monetization enabled before this action. |
| 50101 | This server needs additional boosts before this action. |
| 50109 | The request body contains invalid JSON. |
| 50110 | The provided file is invalid. |
| 50123 | The file type provided is invalid. |
| 50124 | The file duration is greater than the 5.2 seconds maximum. |
| 50131 | Owner cannot be pending member |
| 50132 | Ownership cannot be transferred to a bot user. |
| 50138 | Could not resize asset below the maximum size: 262144. |
| 50144 | Subscription and non subscription roles cannot be mixed for an emoji. |
| 50145 | Premium emoji and normal emoji cannot be converted into each other. |
| 50146 | Uploaded file not found. |
| 50151 | The specified emoji is invalid |
| 50159 | Voice messages cannot include additional content. |
| 50160 | Voice messages require exactly one audio attachment. |
| 50161 | Voice messages require supporting metadata. |
| 50162 | Voice messages cannot be edited. |
| 50163 | Cannot delete guild subscription integration |
| 50167 | Voice effects cannot be sent while the user is server muted, deafened, or suppressed. |
| 50173 | Voice messages cannot be sent in this channel. |
| 50178 | The user account must be verified first. |
| 50192 | The file does not have a valid duration. |
| 50278 | Messages cannot be sent to this user because there are no mutual guilds. |
| 50600 | Permission to send this sticker is missing. |

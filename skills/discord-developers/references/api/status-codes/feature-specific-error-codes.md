# Feature specific error codes
Context: Discord JSON error-code reference; preserve code meanings and linked response interpretation.
[Source](gateway-http-and-api-status-index.md) / [Response code/message/errors interpretation](json.md) / [Previous source section](access-payload-permission-and-validation-codes.md) / [Following source section](example-json-error-response.md)

| Code | Meaning |
| --- | --- |
| 60003 | Two factor is required for this operation. |
| 80004 | No users with DiscordTag exist |
| 90001 | Reaction was blocked |
| 90002 | User cannot use burst reactions |
| 110000 | The index is not available yet. Try again later. |
| 110001 | The application is not available yet. Try again later. |
| 130000 | The API resource is overloaded. Try again a little later. |
| 150006 | The Stage is already open |
| 160002 | Replies require permission to read message history. |
| 160004 | This message already has a thread. |
| 160005 | Thread is locked |
| 160006 | The active thread limit has been reached. |
| 160007 | The active announcement thread limit has been reached. |
| 160014 | A message cannot be forwarded if its content cannot be read. |
| 170001 | The uploaded Lottie file contains invalid JSON. |
| 170002 | Uploaded Lotties cannot include rasterized images such as PNG or JPEG. |
| 170003 | Sticker maximum framerate exceeded |
| 170004 | The sticker frame count is above the 1000 frame maximum. |
| 170005 | Lottie animation maximum dimensions exceeded |
| 170006 | The sticker frame rate is outside the allowed range. |
| 170007 | The sticker animation duration is greater than the 5 seconds maximum. |
| 180000 | Cannot update a finished event |
| 180002 | Creating the stage required for the stage event failed. |
| 200000 | Automatic moderation blocked the message. |
| 200001 | Automatic moderation blocked the title. |
| 220001 | Forum-channel webhook posts require either `thread_name` or `thread_id`. |
| 220002 | Forum-channel webhook posts cannot include both `thread_name` and `thread_id`. |
| 220003 | Webhooks can create threads only in forum channels. |
| 220004 | Webhook services cannot be used in forum channels. |
| 240000 | The harmful links filter blocked the message. |
| 340015 | This user has limited access to joining new servers. |
| 350000 | Onboarding cannot be enabled because requirements are not met. |
| 350001 | Onboarding cannot be updated while requirements are unmet. |
| 400001 | File upload access has been limited for this guild. |
| 500000 | Failed to ban users |
| 520000 | Poll voting blocked |
| 520001 | Poll expired |
| 520002 | Poll creation does not support this channel type. |
| 520003 | Cannot edit a poll message |
| 520004 | An emoji included with the poll cannot be used. |
| 520006 | A non-poll message cannot be expired. |
| 530000 | The Discord application has not been granted permission to use provisional accounts. |
| 530001 | The provided ID token JWT is expired. Request a new one from the identity provider. |
| 530002 | The issuer in the provided ID token JWT differs from the configured issuer. |
| 530003 | The audience in the provided ID token JWT does not match the audience in the OIDC configuration. Update the configuration or supply an ID token issued to the application. |
| 530004 | The provided ID token was issued too long ago. Discord rejects ID tokens issued more than a week ago; request a new ID token from the identity provider. |
| 530006 | Discord could not generate a unique username within the allotted time. This is not terminal and should succeed after retrying. |
| 530007 | The client secret is invalid. Check the submitted value or regenerate the client secret. |

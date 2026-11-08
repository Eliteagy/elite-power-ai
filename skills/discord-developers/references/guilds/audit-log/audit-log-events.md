# Audit log events
Context: Discord developer reference: Audit log events
[Source](audit-log-index.md) / [Owning endpoint, event, object or procedure conditions](audit-log-entry-object.md) / [Following source section](optional-audit-entry-info.md)
<a id="source-audit-log-events"></a>

###### Audit Log Events

 The following table gives audit log events and their `action_type` values. **Object Changed** identifies which object may contribute values to the entry. In normal cases, keys in `changes` map to fields on that object, and the linked object documentation gives field types and descriptions. When no object is listed, the entry will not include `changes`, although `target_id` and often [`options` object](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object-optional-audit-entry-info) fields may still appear. Apps should be prepared for any changed-object field, but no field is guaranteed; usually only some fields appear in `changes`.
| Event | Value | Description | Object Changed |
| --- | --- | --- | --- |
| GUILD_UPDATE | 1 | Server settings were updated | Guild |
| CHANNEL_CREATE | 10 | Channel was created | Channel |
| CHANNEL_UPDATE | 11 | Channel settings were updated | Channel |
| CHANNEL_DELETE | 12 | Channel was deleted | Channel |
| CHANNEL_OVERWRITE_CREATE | 13 | A permission overwrite was created for a channel | Channel Overwrite |
| CHANNEL_OVERWRITE_UPDATE | 14 | A channel permission overwrite was changed | Channel Overwrite |
| CHANNEL_OVERWRITE_DELETE | 15 | A permission overwrite was removed from a channel | Channel Overwrite |
| MEMBER_KICK | 20 | Member was removed from server |  |
| MEMBER_PRUNE | 21 | Members were pruned from server |  |
| MEMBER_BAN_ADD | 22 | Member was banned from server |  |
| MEMBER_BAN_REMOVE | 23 | A member was unbanned from the server |  |
| MEMBER_UPDATE | 24 | Member was updated in server | Member |
| MEMBER_ROLE_UPDATE | 25 | A role was added to or removed from a member | Partial Role* |
| MEMBER_MOVE | 26 | A member was moved into another voice channel |  |
| MEMBER_DISCONNECT | 27 | A member was removed from a voice channel connection |  |
| BOT_ADD | 28 | A bot user joined the server |  |
| ROLE_CREATE | 30 | Role was created | Role |
| ROLE_UPDATE | 31 | Role was edited | Role |
| ROLE_DELETE | 32 | Role was deleted | Role |
| INVITE_CREATE | 40 | Server invite was created | Invite and Invite Metadata* |
| INVITE_UPDATE | 41 | Server invite was updated | Invite and Invite Metadata* |
| INVITE_DELETE | 42 | Server invite was deleted | Invite and Invite Metadata* |
| WEBHOOK_CREATE | 50 | Webhook was created | Webhook* |
| WEBHOOK_UPDATE | 51 | Webhook channel or properties changed | Webhook* |
| WEBHOOK_DELETE | 52 | Webhook was deleted | Webhook* |
| EMOJI_CREATE | 60 | Emoji was created | Emoji |
| EMOJI_UPDATE | 61 | Emoji name was updated | Emoji |
| EMOJI_DELETE | 62 | Emoji was deleted | Emoji |
| MESSAGE_DELETE | 72 | Single message was deleted |  |
| MESSAGE_BULK_DELETE | 73 | Multiple messages were deleted |  |
| MESSAGE_PIN | 74 | A message was pinned in a channel |  |
| MESSAGE_UNPIN | 75 | A message was removed from channel pins |  |
| INTEGRATION_CREATE | 80 | App was added to server | Integration |
| INTEGRATION_UPDATE | 81 | An app changed, for example through scope updates | Integration |
| INTEGRATION_DELETE | 82 | App was removed from server | Integration |
| STAGE_INSTANCE_CREATE | 83 | Stage instance was created (stage channel becomes live) | Stage Instance |
| STAGE_INSTANCE_UPDATE | 84 | Stage instance details were updated | Stage Instance |
| STAGE_INSTANCE_DELETE | 85 | A stage instance was removed, ending the live stage channel | Stage Instance |
| STICKER_CREATE | 90 | Sticker was created | Sticker |
| STICKER_UPDATE | 91 | Sticker details were updated | Sticker |
| STICKER_DELETE | 92 | Sticker was deleted | Sticker |
| GUILD_SCHEDULED_EVENT_CREATE | 100 | Event was created | Guild Scheduled Event |
| GUILD_SCHEDULED_EVENT_UPDATE | 101 | Event was updated | Guild Scheduled Event |
| GUILD_SCHEDULED_EVENT_DELETE | 102 | Event was cancelled | Guild Scheduled Event |
| THREAD_CREATE | 110 | A channel thread was created | Thread |
| THREAD_UPDATE | 111 | Thread was updated | Thread |
| THREAD_DELETE | 112 | Thread was deleted | Thread |
| APPLICATION_COMMAND_PERMISSION_UPDATE | 121 | Command permissions changed | Command Permission* |
| SOUNDBOARD_SOUND_CREATE | 130 | Soundboard sound was created | Soundboard Sound |
| SOUNDBOARD_SOUND_UPDATE | 131 | Soundboard sound was updated | Soundboard Sound |
| SOUNDBOARD_SOUND_DELETE | 132 | Soundboard sound was deleted | Soundboard Sound |
| AUTO_MODERATION_RULE_CREATE | 140 | Auto Moderation rule was created | Auto Moderation Rule |
| AUTO_MODERATION_RULE_UPDATE | 141 | Auto Moderation rule was updated | Auto Moderation Rule |
| AUTO_MODERATION_RULE_DELETE | 142 | Auto Moderation rule was deleted | Auto Moderation Rule |
| AUTO_MODERATION_BLOCK_MESSAGE | 143 | Auto Moderation blocked a message |  |
| AUTO_MODERATION_FLAG_TO_CHANNEL | 144 | Auto Moderation flagged a message |  |
| AUTO_MODERATION_USER_COMMUNICATION_DISABLED | 145 | Auto Moderation timed out a member |  |
| AUTO_MODERATION_QUARANTINE_USER | 146 | Auto Moderation quarantined a member |  |
| CREATOR_MONETIZATION_REQUEST_CREATED | 150 | Creator monetization request was created |  |
| CREATOR_MONETIZATION_TERMS_ACCEPTED | 151 | Creator monetization terms were accepted |  |
| ONBOARDING_PROMPT_CREATE | 163 | Guild Onboarding Question was created | Onboarding Prompt Structure |
| ONBOARDING_PROMPT_UPDATE | 164 | Guild Onboarding Question was updated | Onboarding Prompt Structure |
| ONBOARDING_PROMPT_DELETE | 165 | Guild Onboarding Question was deleted | Onboarding Prompt Structure |
| ONBOARDING_CREATE | 166 | Guild Onboarding was created | Guild Onboarding |
| ONBOARDING_UPDATE | 167 | Guild Onboarding was updated | Guild Onboarding |
| HOME_SETTINGS_CREATE | 190 | Guild Server Guide was created |  |
| HOME_SETTINGS_UPDATE | 191 | Guild Server Guide was updated |  |
| VOICE_CHANNEL_STATUS_CREATE | 192 | A user set the status for a voice channel |  |
| VOICE_CHANNEL_STATUS_DELETE | 193 | A user deleted a voice channel status |  |

 * This object has exceptions for available keys. See [exceptions](https://docs.discord.com/developers/resources/audit-log#audit-log-change-object-audit-log-change-exceptions).


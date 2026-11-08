# Message object
Context: Discord developer reference: Message object
[Source](message-objects-and-embeds-index.md) / [Following source section](message-object-message-types.md)
<a id="source-message-part-1"></a> <a id="source-message-object"></a> <a id="source-message-structure"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### Message Object

 Describes a message posted in a Discord channel.

###### Message Structure

 The [Gateway documentation](https://docs.discord.com/developers/events/gateway-events#message-create) lists fields that are specific to `MESSAGE_CREATE` and `MESSAGE_UPDATE`. If an app has not configured or been approved for the [`MESSAGE_CONTENT` privileged intent (`1 << 15`)](https://docs.discord.com/developers/events/gateway#message-content-intent), Discord sends empty `content`, `embeds`, `attachments`, and `components` values and omits `poll`.
| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of the message |
| channel_id | snowflake | channel id where the message was sent |
| author [1] | user object | message author; not always a valid user, see the note below |
| content [2] | string | contents of the message |
| timestamp | ISO8601 timestamp | when this message was sent |
| edited_timestamp | ?ISO8601 timestamp | edit timestamp, or null when the message has never been edited |
| tts | boolean | whether the message used TTS |
| mention_everyone | boolean | whether this message mentions everyone |
| mentions | array of user objects | users explicitly mentioned by the message |
| mention_roles | array of role object ids | roles explicitly mentioned by the message |
| mention_channels? [3] | array of channel mention objects | channels explicitly mentioned by the message |
| attachments [2] | array of attachment objects | attached files not referenced from embeds or components |
| embeds [2] | array of embed objects | any embedded content |
| reactions? | array of reaction objects | reactions to the message |
| nonce? | integer or string | nonce used to confirm that a message was sent |
| pinned | boolean | whether this message is pinned |
| webhook_id? | snowflake | webhook id when a webhook generated the message |
| type | integer | type of message |
| activity? | message activity object | included with Rich Presence-related chat embeds |
| application? | partial application object | included with Rich Presence-related chat embeds |
| application_id? | snowflake | application id for an Interaction or application-owned webhook message |
| flags? | integer | message flags encoded as a bitfield |
| message_reference? | message reference object | metadata identifying the source message for a crosspost, channel follow add, pin, or reply |
| message_snapshots? [5] | array of message snapshot objects | message tied to the `message_reference`; only a minimal field subset is included, such as excluding `author` |
| referenced_message? [4] | ?message object | message linked by message_reference |
| interaction_metadata? | message interaction metadata object | included when an interaction produced the message |
| interaction? | message interaction object | **Deprecated in favor of `interaction_metadata`**; included when the message responds to an interaction |
| thread? | channel object | thread created from this message, including the thread member object |
| components? [2] | array of message components | included when the message includes components such as buttons, action rows, or other interactive elements |
| sticker_items? | array containing message sticker item objects | included when the message includes stickers |
| stickers? | array of sticker objects | **Deprecated** stickers included with the message |
| position? | integer | approximate thread position, represented by a generally increasing integer that can contain gaps or duplicates; compare it with `total_message_sent` on the parent thread to estimate relative order |
| role_subscription_data? | role subscription data object | role subscription purchase or renewal data that triggered this ROLE_SUBSCRIPTION_PURCHASE message |
| resolved? | resolved data | resolved data for users, members, channels, and roles referenced by the message |
| poll? [2] | poll object | A poll! |
| call? | message call object | call linked to the message |
| shared_client_theme? | shared client theme object | custom client-side theme shared in the message |

 [1] The author object uses the user object shape, but it is a valid user only when a user or bot user created the message. For webhook-generated messages, the author object maps to the webhook id, username, and avatar; check `webhook_id` to identify those messages. [2] Without configuration or approval for the [`MESSAGE_CONTENT` privileged intent (`1 << 15`)](https://docs.discord.com/developers/events/gateway#message-content-intent), apps receive empty `content`, `embeds`, `attachments`, and `components` values and no `poll`. [3] `mention_channels` does not include every channel mention. It can include only textual channels visible to everyone in a public guild, and `mention_channels` currently appears only on crossposted messages through Channel Following. If no mention qualifies, Discord omits the field. [4] This field is returned only for messages whose `type` is `19` (REPLY), `21` (THREAD_STARTER_MESSAGE), or `23` (CONTEXT_MENU_COMMAND). If such a message lacks `referenced_message`, the backend did not try to fetch the replied-to message, so the state is unknown. If the field exists and is null, the referenced message was deleted. [5] See [message reference types](https://docs.discord.com/developers/resources/message#message-reference-types)


# SDK interfaces message
Context: Discord developer reference: SDK interfaces message
[Source](../object-interfaces-index.md) / [Owning endpoint, event, object or procedure conditions](../events/sdk-interfaces-activity.md) / [Previous source section](initiate-image-upload-response.md) / [Following source section](sdk-interfaces-message-activity.md)
<a id="source-message"></a>

#### Message

| Property | Type |  |
| --- | --- | --- |
| id | string |  |
| channel_id | string |  |
| guild_id? | string | null |  |
| author? | User | null |  |
| member? | GuildMember | null |  |
| content | string |  |
| timestamp | string |  |
| edited_timestamp? | string | null |  |
| tts | boolean |  |
| mention_everyone | boolean |  |
| mentions | User[] |  |
| mention_roles | string[] |  |
| mention_channels | ChannelMention[] |  |
| attachments | Attachment[] |  |
| embeds | Embed[] |  |
| reactions? | Reaction[] | null |  |
| nonce? | string | number | null |
| pinned | boolean |  |
| webhook_id? | string | null |  |
| type | number |  |
| activity? | MessageActivity | null |  |
| application? | MessageApplication | null |  |
| message_reference? | MessageReference | null |  |
| flags? | number |  |
| stickers? | Sticker[] | null |  |
| referenced_message? | Message | null |  |


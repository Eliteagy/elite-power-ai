# Interaction response structure
Context: Discord developer reference: Interaction response structure
[Source](interaction-objects-and-responses-index.md) / [Previous source section](responding-to-an-interaction.md) / [Following source section](interaction-callback.md)
<a id="source-interaction-response-object"></a> <a id="source-interaction-response-structure"></a> <a id="source-interaction-callback-type"></a> <a id="source-interaction-callback-data-structure"></a> <a id="source-messages"></a> <a id="source-autocomplete"></a> <a id="source-modal"></a>

### Interaction Response Object

###### Interaction Response Structure

| Field | Type | Description |
| --- | --- | --- |
| type | interaction callback type | Type of response |
| data? | interaction callback data | An optional response message |

###### Interaction Callback Type

| Name | Value | Description |
| --- | --- | --- |
| PONG | 1 | ACK a `Ping` |
| CHANNEL_MESSAGE_WITH_SOURCE | 4 | Reply to an interaction with a message |
| DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE | 5 | ACK the interaction, show a loading state, and edit the response later |
| DEFERRED_UPDATE_MESSAGE* | 6 | For components, ACK the interaction and later edit the original message without showing a loading state |
| UPDATE_MESSAGE* | 7 | For components, update the message where the component was attached |
| APPLICATION_COMMAND_AUTOCOMPLETE_RESULT | 8 | Return suggested choices for an autocomplete interaction |
| MODAL** | 9 | Open a popup modal as the interaction response |
| PREMIUM_REQUIRED | 10 | **Deprecated**; return an upgrade button, available only to monetization-enabled apps |
| LAUNCH_ACTIVITY | 12 | Start the app's associated Activity; available only for apps with Activities enabled |

 * Valid only for [component-based](https://docs.discord.com/developers/components/reference) interactions ** Unavailable for `MODAL_SUBMIT` and `PING` interactions.

###### Interaction Callback Data Structure

###### Messages

 Some message fields are not supported at this time.
| Field | Type | Description |
| --- | --- | --- |
| tts? | boolean | Whether the response is TTS |
| content? | string | Message content |
| embeds? | array of embeds | Supports up to 10 embeds |
| allowed_mentions? | allowed mentions | Allowed mentions object |
| flags? * | integer | Message flags as a combined bitfield; only `SUPPRESS_EMBEDS`, `EPHEMERAL`, `IS_COMPONENTS_V2`, `IS_VOICE_MESSAGE`, and `SUPPRESS_NOTIFICATIONS` may be set |
| components? | array of components | Message components |
| attachments? ** | array of partial attachment objects | Attachment objects that include filename and description |
| poll? | poll request object | Details about the poll |

 * For a callback of [type](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type) `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE`, the only permitted [message flag](https://docs.discord.com/developers/resources/message#message-object-message-flags) is `EPHEMERAL`. To create a component-based message with `IS_COMPONENTS_V2`, use the [edit original response](https://docs.discord.com/developers/interactions/receiving-and-responding#edit-original-interaction-response) endpoint instead. ** See [Uploading Files](https://docs.discord.com/developers/reference#uploading-files) for file details.

###### Autocomplete

| Field | Type | Description |
| --- | --- | --- |
| choices | array of choices | autocomplete choices (max of 25 choices) |

###### Modal

| Field | Type | Description |
| --- | --- | --- |
| custom_id | string | Developer-specified modal identifier, 1-100 characters |
| title | string | Popup modal title, maximum 45 characters |
| components | array of components | Modal components, from 1 through 5 inclusive |

 When application responses contain user data, use [`allowed_mentions`](https://docs.discord.com/developers/resources/message#allowed-mentions-object) to control which mentions in `content` create pings.


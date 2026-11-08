# Embed fields by embed type
Context: Discord developer reference: Embed fields by embed type
[Source](attachments-and-message-creation-index.md) / [Owning endpoint, event, object or procedure conditions](embed-object-embed-structure.md) / [Previous source section](embed-media-flags.md) / [Following source section](attachment-object-attachment-structure.md)
<a id="source-embed-fields-by-embed-type"></a> <a id="source-poll-result-embed-fields"></a>

#### Embed Fields by Embed Type

 Some embed types drive special UIs and store extra key-value data in [fields](https://docs.discord.com/developers/resources/message#embed-object-embed-field-structure). The list below shows possible fields for those embed types.

###### Poll Result Embed Fields

| Field | Description |
| --- | --- |
| poll_question_text | text of the original poll question |
| victor_answer_votes | vote count for the top answer(s) |
| total_votes | total poll vote count |
| victor_answer_id? | id for the winning answer |
| victor_answer_text? | text for the winning answer |
| victor_answer_emoji_id? | emoji id attached to the winning answer |
| victor_answer_emoji_name? | emoji name attached to the winning answer |
| victor_answer_emoji_animated? | whether the winning answer emoji is animated |


# Auto Moderation Spam and Mention Spam Trigger Types

Date: 2022-09-21
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3640) · [Year index](INDEX.md)

<a id="source-auto-moderation-spam-and-mention-spam-trigger-types"></a>


Auto Moderation gained two new [trigger types](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types):
- `MENTION_SPAM` blocks messages that mention more than a configured number of unique guild members or roles. Apps set that number up to 50 using `mention_total_limit` in the [trigger metadata object](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) when creating or updating an Auto Moderation rule.
- `SPAM` blocks messages and links classified as spam.
See the [Auto Moderation documentation](https://docs.discord.com/developers/resources/auto-moderation) for more information.

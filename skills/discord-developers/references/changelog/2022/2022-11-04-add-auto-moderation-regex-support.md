# Add Auto Moderation Regex Support

Date: 2022-11-04
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3586) · [Year index](INDEX.md)

<a id="source-add-auto-moderation-regex-support"></a>


Auto Moderation rules using [trigger_type](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types) `KEYWORD` now support `regex_patterns` in [trigger_metadata](https://docs.discord.com/developers/resources/auto-moderation#auto-moderation-rule-object-trigger-types). Regex patterns can represent many keywords in one expression. Only Rust flavored regex is supported; tools such as [Rustexp](https://rustexp.lpil.uk/) can test it.

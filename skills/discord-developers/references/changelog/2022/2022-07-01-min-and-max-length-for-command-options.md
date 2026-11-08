# Min and Max Length for Command Options

Date: 2022-07-01
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3759) · [Year index](INDEX.md)

<a id="source-min-and-max-length-for-command-options"></a>


Application [command options](https://docs.discord.com/developers/interactions/application-commands#application-command-object-application-command-option-structure) of type `STRING` now support optional `min_length` and `max_length` fields for controlling user-entered text length. `min_length` must be greater than or equal to `0`, and `max_length` must be greater than or equal to `1`.

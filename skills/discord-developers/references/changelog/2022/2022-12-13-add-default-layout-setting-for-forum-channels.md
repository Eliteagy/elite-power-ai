# Add Default Layout setting for Forum channels

Date: 2022-12-13
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3391) · [Year index](INDEX.md)

<a id="source-add-default-layout-setting-for-forum-channels"></a>


`default_forum_layout` is an optional [channel object](https://docs.discord.com/developers/resources/channel) field that controls the default post layout for a [forum channel](https://docs.discord.com/developers/topics/threads#forums). 1 (`LIST_VIEW`) displays posts as a chronological list, while 2 (`GALLERY_VIEW`) displays them as tiles. If unset, `default_forum_layout` is `0`. Changing `default_forum_layout` requires `MANAGE_CHANNELS`.

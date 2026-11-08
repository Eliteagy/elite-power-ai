# Pin Permission Split

Date: 2025-08-20
Categories: Breaking Change, HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1686) · [Year index](INDEX.md)

<a id="source-pin-permission-split"></a>


[Pinning](https://docs.discord.com/developers/resources/message#pin-message) and [unpinning](https://docs.discord.com/developers/resources/message#unpin-message) messages now use their own [permission](https://docs.discord.com/developers/topics/permissions#permissions-bitwise-permission-flags). `PIN_MESSAGES` has been split from `MANAGE_MESSAGES` to give more precise control over who may pin messages in a channel. The change is effective immediately for both users and apps. Backwards compatibility remains until January 12th 2026, when `MANAGE_MESSAGES` will stop granting pin and unpin ability.

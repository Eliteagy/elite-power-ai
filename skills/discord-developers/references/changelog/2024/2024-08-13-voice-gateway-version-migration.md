# Voice Gateway Version 8 and Deprecation of Versions < 4

Date: 2024-08-13
Categories: Gateway, Voice
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L2697) · [Year index](INDEX.md)

<a id="source-voice-gateway-version-8-and-deprecation-of-versions--4"></a>


Discord is deprecating very old voice gateway versions (> 7 years ago).
- Voice gateway version 8 adds buffered resume support, which re-sends lost messages. Use voice gateway version 8 and see [Buffered Resume](https://docs.discord.com/developers/topics/voice-connections#buffered-resume).
- The default voice gateway version option has been removed. After deprecation, callers must pass a voice gateway version.
Callers will need to pass a voice gateway version, and deprecated voice gateway versions are scheduled for discontinuation on November 18th, 2024. See [Voice Gateway Versioning](https://docs.discord.com/developers/topics/voice-connections#voice-gateway-versioning) for details. August 12, 2024 HTTP API

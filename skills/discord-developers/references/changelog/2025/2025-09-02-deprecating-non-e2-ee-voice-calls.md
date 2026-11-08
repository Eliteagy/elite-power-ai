# Deprecating Non-E2EE Voice Calls

Date: 2025-09-02
Categories: Voice
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L1593) · [Year index](INDEX.md)

<a id="source-deprecating-non-e2ee-voice-calls"></a>


Discord began work on end-to-end encryption more than two years ago to improve user privacy and security. With DAVE now available across all platforms, Discord is close to making every call fully end-to-end encrypted.

<a id="source-developer-impact"></a>

### Developer Impact

To meet long-term privacy goals, Discord will require E2EE after **March 1st, 2026** for Discord audio and video conversations in DMs, GDMs, voice channels, and Go Live streams. After that date, clients and applications without DAVE support will not be able to join Discord calls.

<a id="source-implementing-e2ee-voice"></a>

### Implementing E2EE Voice

Developers using Discord voice APIs can use [the updated voice documentation](https://docs.discord.com/developers/topics/voice-connections), implementation examples in the [open-source repository](https://github.com/discord/libdave), and [the protocol whitepaper](https://github.com/discord/dave-protocol). The [Discord Developers community](https://discord.gg/discord-developers) can help with integration questions. Discord aims to make the migration smooth while delivering DAVE privacy and security benefits to users.

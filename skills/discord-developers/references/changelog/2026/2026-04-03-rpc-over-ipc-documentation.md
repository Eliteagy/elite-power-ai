# RPC over IPC Documentation

Date: 2026-04-03
Categories: RPC
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L791) · [Year index](INDEX.md)

<a id="source-rpc-over-ipc-documentation"></a>


Documentation is now available for Discord's RPC over IPC (Inter-Process Communication) transport. IPC lets native applications communicate with a local Discord client using high-performance local transport without network overhead. The [RPC documentation](https://docs.discord.com/developers/topics/rpc) covers:
- IPC socket paths for Windows and Linux/macOS.
- Handshake flow and opcodes
- IPC-specific events: `READY`, `ERROR`, and `GUILD_STATUS`.
For games integrating Discord social features, Discord recommends the [Discord Social SDK](https://docs.discord.com/developers/discord-social-sdk/overview) instead of direct RPC communication.

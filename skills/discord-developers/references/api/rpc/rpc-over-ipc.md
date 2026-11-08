# RPC over ipc
Context: Discord developer reference: RPC over ipc
[Source](connection-and-command-contracts-index.md) / [Following source section](connecting-to-ipc.md)
<a id="source-rpc-part-1"></a> <a id="source-rpc-over-ipc"></a> <a id="source-ipc-path"></a>

> Discord Developers reference. Original prose; identifiers preserved verbatim.

### RPC over IPC

 Discord’s RPC server supports IPC (Inter-Process Communication) as a transport for native applications plus games. This permits high-performance, local communication using the Discord client without requiring network-level overhead. We recommend using this [Discord Social SDK](https://docs.discord.com/developers/discord-social-sdk/overview) for new projects which are looking to integrate Discord’s social features into their game.

###### IPC Path

| Platform | Path Format |
| --- | --- |
| Windows | `\\?\pipe\discord-ipc-{n}` |
| Linux/macOS | `${XDG_RUNTIME_DIR}/discord-ipc-{n}`, `${TMPDIR}/discord-ipc-{n}`, `${TMP}/discord-ipc-{n}`, `${TEMP}/discord-ipc-{n}`, or `/tmp/discord-ipc-{n}` |

 On Linux/macOS, Discord resolves this IPC prefix in this order: `XDG_RUNTIME_DIR`, `TMPDIR`, `TMP`, `TEMP`, then `/tmp` as one final fallback.


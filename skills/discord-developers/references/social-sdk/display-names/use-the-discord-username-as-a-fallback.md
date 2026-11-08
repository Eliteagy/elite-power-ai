# Use the discord username as a fallback
Context: Discord developer reference: Use the discord username as a fallback
[Source](../debugging/logging-api-and-unicode-index.md) / [Owning endpoint, event, object or procedure conditions](use-a-font-family-that-supports-unicode.md) / [Previous source section](map-the-unicode-characters-to-ascii.md) / [Following source section](use-a-font-family-that-supports-unicode-change-log.md)
<a id="source-use-the-discord-username-as-a-fallback"></a>

### Use the Discord Username as a Fallback

 If a Display Name cannot be rendered at all, use the user's [`Username`](https://discord.com/developers/docs/slayer-sdk/classdiscordpp_1_1UserHandle.html#a0eda41fe18b50bce373fb5a1b88cb411) as a fallback. **Tradeoffs:**
- This can reduce immersion when a friend expected their in-game identity to use their Display Name.
- Some users treat Username as more private and may not expect it to appear to others, for example on a visible friends list during a stream.

---


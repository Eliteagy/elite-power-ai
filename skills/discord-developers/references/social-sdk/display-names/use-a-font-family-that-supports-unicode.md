# Use a font family that supports unicode
[Source](../debugging/logging-api-and-unicode-index.md) / [Previous source section](../rate-limits/overview-change-log.md) / [Following source section](use-a-font-family-that-supports-unicode.md)

<a id="source-use-a-font-family-that-supports-unicode"></a>

## Use a font family that supports Unicode

The Social SDK [recommends](https://discord.com/developers/docs/discord-social-sdk/development-guides/creating-a-unified-friends-list#step-1-fetch-relationships) showing an account's [Display Name](https://discord.com/developers/docs/slayer-sdk/classdiscordpp_1_1UserHandle.html#af6447fa2011bfa4fcd7e55bc56847f5c) in the Unified Friends List. Display Names may contain many Unicode characters, and a game font might not include every glyph. You can handle that in several ways:

<a id="source-use-a-font-family-that-supports-unicode-1"></a>

### Use a font family that supports Unicode

 Fonts such as [Noto](https://notofonts.github.io/) target broad Unicode coverage. If the selected game font cannot draw a Display Name, render with a fallback font; in severe cases, choose a broadly covered font for the Friends List. **Tradeoffs:**
- No single family is guaranteed to cover every character Discord allows.
- A Unicode-capable font may conflict with the visual style of your game.
- Engine handling can be incomplete, particularly for UTF surrogate-pair characters.

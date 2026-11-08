# What these callbacks do
Context: Discord developer reference: What these callbacks do
[Source](unity-setup-and-authentication-index.md) / [Previous source section](setting-up-sdk-event-handling.md) / [Following source section](account-linking-with-discord.md)
<a id="source-what-these-callbacks-do"></a>

### What These Callbacks Do

- The **logging callback** exposes behind-the-scenes SDK behavior and is valuable for debugging
- The **status callback** reports when the client is connected and Discord features can be used
 The Unity plugin runs SDK callbacks inside Unity automatically, so you do not need [`RunCallbacks`](https://discord.com/developers/docs/social-sdk/namespacediscordpp.html#ab5dd8cf274f581ee1885de5816be3c29) as shown in the [C++ guide](https://docs.discord.com/developers/discord-social-sdk/getting-started/using-c++). Most Discord functionality is unavailable until status becomes `Ready`. The status callback tells you when that point is reached. Authentication with Discord is required before reaching `Ready`, so handle that next.

---


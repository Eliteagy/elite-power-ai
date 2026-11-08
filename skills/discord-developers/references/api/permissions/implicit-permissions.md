# Implicit permissions
Context: Discord developer reference: Implicit permissions
[Source](permissions-index.md) / [Previous source section](permission-overwrites.md) / [Following source section](inherited-permissions-threads.md)
<a id="source-implicit-permissions"></a>

### Implicit Permissions

Some Discord permissions become ineffective because another required capability is missing. In text channels, the main examples are `VIEW_CHANNEL` and `SEND_MESSAGES`. Denying `VIEW_CHANNEL` to a user or role prevents meaningful use of other channel permissions, because the user cannot see the channel. A permission such as `SEND_MESSAGES` might not be explicitly denied in the calculation, but it has no effect without channel visibility. Denying `SEND_MESSAGES` similarly makes `MENTION_EVERYONE`, `SEND_TTS_MESSAGES`, `ATTACH_FILES`, and `EMBED_LINKS` unusable because the user cannot send messages. For voice and stage channels, denying `CONNECT` can also make other permissions, such as `MANAGE_CHANNEL`, ineffective. Discord may apply the same reasoning to other permission combinations when one action logically depends on another.


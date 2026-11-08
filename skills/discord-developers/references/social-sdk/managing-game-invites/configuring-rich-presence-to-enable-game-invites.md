# Configuring rich presence to enable game invites
Context: Discord developer reference: Configuring rich presence to enable game invites
[Source](managing-game-invites-index.md) / [Previous source section](prerequisites.md) / [Following source section](setting-up-rich-presence.md)
<a id="source-configuring-rich-presence-to-enable-game-invites"></a>

### Configuring Rich Presence to Enable Game Invites

 Game invites, sometimes called activity invites, rely on rich presence. The [Setting Rich Presence](https://docs.discord.com/developers/discord-social-sdk/development-guides/setting-rich-presence) guide covers the basics; this section repeats the invite-specific pieces. Discord uses Rich Presence and Activity for the same user-state concept in several places: the SDK represents it with the [`Activity`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#ae793d9adbe16fef402b859ba02bee682) class, and gateway payloads include it [in our gateway events](https://docs.discord.com/developers/events/gateway-events#activity-object). Do not confuse that with [Discord Activities](https://docs.discord.com/developers/activities/overview), which are embedded games that may display rich presence too.


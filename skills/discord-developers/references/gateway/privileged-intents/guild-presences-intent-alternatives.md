# Guild presences intent alternatives
Context: Discord developer reference: Guild presences intent alternatives
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](guild-presences-intent-capabilities.md) / [Following source section](guild-presences-intent-decision.md)
<a id="source-what-you-can-do-without-the-intent-1"></a>

### What you can do without the intent

 Individual presence data is not available through another API. Before building around it, decide whether the app truly needs real-time presence per user. These alternatives do not require the Guild Presences intent:
- **[Get User](https://docs.discord.com/developers/resources/user#get-user):** Fetch profile fields such as username, avatar, and banner without using this intent. That is enough for many "user info" command designs.
- **[Guild Object - approximate_presence_count](https://docs.discord.com/developers/resources/guild#get-guild):** The Guild object exposes an approximate count of online members through the API without revealing individual presences.


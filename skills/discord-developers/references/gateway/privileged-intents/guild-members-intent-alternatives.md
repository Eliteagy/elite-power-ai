# Guild members intent alternatives
Context: Discord developer reference: Guild members intent alternatives
[Source](privileged-intent-policy-index.md) / [Owning endpoint, event, object or procedure conditions](who-does-this-apply-to.md) / [Previous source section](guild-members-intent-capabilities.md) / [Following source section](guild-members-intent-decision.md)
<a id="source-what-you-can-do-without-the-intent"></a>

### What you can do without the intent

 If the app does not require every member or real-time member events, several REST endpoints work **without** the Guild Members intent:
- **[Get Guild Member](https://docs.discord.com/developers/resources/guild#get-guild-member):** Retrieve one member by user ID. When you already know *who* you need, enumerating the server is unnecessary.
- **[Search Guild Members](https://docs.discord.com/developers/resources/guild#search-guild-members):** Find members by username or nickname prefix. This suits autocomplete, lookup commands, and targeted searches.
- **[Get User](https://docs.discord.com/developers/resources/user#get-user):** Retrieve basic user details such as username and avatar without guild context.
- **[Interaction-provided member data](https://docs.discord.com/developers/interactions/receiving-and-responding#message-interaction-object):** Slash commands, buttons, select menus, and modals include a member object in the interaction payload. That gives roles, nickname, permissions, and related data without the intent.


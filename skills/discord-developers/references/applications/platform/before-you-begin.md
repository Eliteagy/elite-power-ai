# Before you begin
Context: Discord developer reference: Before you begin
[Source](accounts-games-and-commerce-index.md) / [Owning endpoint, event, object or procedure conditions](what-is-game-claiming.md) / [Previous source section](what-is-game-claiming-verified-checkmark.md) / [Following source section](open-game-identity-in-the-developer-portal.md)
<a id="source-before-you-begin"></a>

### Before You Begin

 Confirm these requirements before starting:
- Your game needs a Steam store page. Other storefronts are not supported yet.
- The Steam store page needs a public Discord invite link. During claiming, Discord gives you a `proof` value that must be appended to that link before submission.
- Games primarily delivering sexual content, and Mods of other games, cannot be claimed.
- Your Discord application must belong to a [development team](https://docs.discord.com/developers/topics/teams#teams), not an individual account.
- The server owner has to be on your Team. Discord checks ownership by emailing a verification code to that owner.
- Discord must already have an official record for the game. Automatic recognition depends on enough playerbase and play time among Discord users over a sustained period.
 To determine whether Discord already recognizes the game, look it up in the Game Identity dropdown during Step 2. If the title is absent, Discord has not yet created an official record for it. Eligibility can appear later as playerbase and playtime grow. Implementing [Rich Presence](https://docs.discord.com/developers/platform/rich-presence) through the Discord Social SDK is separate from automatic game detection; the systems are independent, and Rich Presence alone does not make a game claimable. Private beta and limited-release games are not supported at this time. A game must be publicly available and playable to qualify for claiming.

---


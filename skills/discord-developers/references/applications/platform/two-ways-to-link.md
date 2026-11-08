# Two ways to link
Context: Discord developer reference: Two ways to link
[Source](accounts-games-and-commerce-index.md) / [Owning endpoint, event, object or procedure conditions](what-is-account-linking.md) / [Previous source section](understanding-the-oauth2-flow.md) / [Following source section](linking-from-your-game.md)
<a id="source-two-ways-to-link"></a>

### Two Ways to Link

 Account linking can be implemented through two flows:
|  | **Game Flow** | **Web Flow** |
| --- | --- | --- |
| **What it is** | The player authorizes from your game through the Discord client, overlay, or browser | The player authorizes on a web page from any device |
| **Requires** | Discord Social SDK | Standard OAuth2 implementation |
| **Platforms** | Desktop, Mobile, Console | All platforms that support web |
| **Player experience** | Keeps the player in game context; the Discord app or overlay opens, with browser fallback | Opens a browser / web page |

 Game Flow and Web Flow both link the player's Discord account to your game. If they request the same OAuth2 scopes, the player receives the same features no matter which flow was used. Offering both gives players more ways to connect. Game Flow requires the player to be running your game on the same device. Web Flow is more portable and works from web-based touchpoints such as an Official Game Community, Game Shop, or external URL. A player linked through one method is already linked for the other, so you can add the second flow later without asking players to connect again. Web Flow is not an embedded browser inside your game; it is a separate web OAuth2 flow, usually reached from Discord entry points or outside URLs.


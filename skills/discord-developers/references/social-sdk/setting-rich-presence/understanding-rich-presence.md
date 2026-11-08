# Understanding rich presence
Context: Discord developer reference: Understanding rich presence
[Source](setting-rich-presence-index.md) / [Previous source section](prerequisites.md) / [Following source section](customizing-rich-presence.md)
<a id="source-understanding-rich-presence"></a>

### Understanding Rich Presence

 Rich Presence publishes detailed information about a player's in-game actions. Discord may show that information in places such as:
- User profiles
- Friend lists
- Server member lists
 First, distinguish the Discord terms. Rich Presence, also called “Activity”, represents a user's current activity and is modeled by [`Activity`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#ae793d9adbe16fef402b859ba02bee682) in the SDK and [in our gateway events](https://docs.discord.com/developers/events/gateway-events#activity-object). Do not confuse this with [Discord Activities](https://docs.discord.com/developers/activities/overview), which are embedded games that can also publish rich presence. Each [`Activity`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Activity.html#ae793d9adbe16fef402b859ba02bee682) has fields for:
| Field | Description | Purpose |
| --- | --- | --- |
| `name` | Game or app name | Shown on the user's profile |
| `type` | Activity type | The player action category, such as “Playing”, “Watching”, or “Listening” |
| `details` | What the player is doing | Primary activity text, such as “Playing Capture the Flag” |
| `state` | Their current status | Secondary status, such as “In Queue”, “In Match”, or “In a group” |
| `party` | Party information | Party count and maximum size, for example “2 of 4” |
| `timestamps` | Activity duration | Shows elapsed or remaining time |
| `assets` | Custom artwork | Images such as map thumbnails, game art, or character icons |
| `secrets` | Join/spectate tokens | Enable Game Invite functionality |
| `supportedPlatforms` | Platform flags | Control where join buttons appear |

 The examples below show how to set these fields. Games should set `type` to `ActivityTypes::Playing`, even though multiple [`ActivityTypes`](https://discord.com/developers/docs/social-sdk/namespacediscordpp.html#a6c76a8cbbc9270f025fd6854d5558660) exist. The SDK ties the activity to your game, so fields such as `name` default to the game name. To override that displayed name, see [Setting the Application Name](https://docs.discord.com/developers/discord-social-sdk/development-guides/setting-rich-presence#setting-the-application-name).


# Usernames and nicknames connection object
Context: Discord developer reference: Usernames and nicknames connection object
[Source](../users-and-voice-index.md) / [Owning endpoint, event, object or procedure conditions](usernames-and-nicknames.md) / [Previous source section](usernames-and-nicknames-nameplate.md) / [Following source section](application-role-connection-object.md)
<a id="source-connection-object"></a> <a id="source-connection-structure"></a> <a id="source-services"></a> <a id="source-visibility-types"></a>

### Connection Object

 The connection object attached to the user.

###### Connection Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | id of the connection account |
| name | string | the username on the connected account |
| type | string | the service of this connection |
| revoked? | boolean | whether the connection is revoked |
| integrations? | array | an array containing partial server integrations |
| verified | boolean | whether the connection is verified |
| friend_sync | boolean | whether friend sync is enabled on this connection |
| show_activity | boolean | whether presence updates display activities tied to this connection |
| two_way_link | boolean | whether a matching third party OAuth2 token exists for this connection |
| visibility | integer | visibility of this connection |

###### Services

| Value | Name |
| --- | --- |
| amazon-music | Amazon Music |
| battlenet | Battle.net |
| bungie | Bungie.net |
| bluesky | Bluesky |
| crunchyroll | Crunchyroll |
| domain | Domain |
| ebay | eBay |
| epicgames | Epic Games |
| facebook | Facebook |
| github | GitHub |
| instagram * | Instagram |
| leagueoflegends | League of Legends |
| mastodon | Mastodon |
| paypal | PayPal |
| playstation | PlayStation Network |
| reddit | Reddit |
| riotgames | Riot Games |
| roblox | Roblox |
| spotify | Spotify |
| skype * | Skype |
| steam | Steam |
| tiktok | TikTok |
| twitch | Twitch |
| twitter | X (Twitter) |
| xbox | Xbox |
| youtube | YouTube |

 * Users can no longer add this service

###### Visibility Types

| Value | Name | Description |
| --- | --- | --- |
| 0 | None | hidden from everyone except the user |
| 1 | Everyone | visible to everyone |


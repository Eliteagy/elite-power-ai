# Registering a steam game
Context: Discord developer reference: Registering a steam game
[Source](managing-game-invites-index.md) / [Previous source section](registering-a-launch-command.md) / [Following source section](sending-game-invites.md)
<a id="source-registering-a-steam-game"></a>

### Registering a Steam Game

 For Steam distribution, [`Client::RegisterLaunchSteamApplication`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a45b2c791c5b06f77d457dacb53dfba40) registers the Steam game ID on this machine. Like command registration, run it during SDK startup so Discord can start the game when the user opens an invite.

```
client->RegisterLaunchSteamApplication(YOUR_APP_ID, STEAM_GAME_ID);

```

---


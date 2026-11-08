# Registering a launch command
[Source](managing-game-invites-index.md) / [Previous source section](putting-it-all-together.md) / [Following source section](registering-a-launch-command.md)

<a id="source-registering-a-launch-command"></a>

### Registering a Launch Command

 Before sending a game invite, register how Discord should launch your game when a user opens an invite. Launch registration is local, so it only applies on the machine where the call runs. Register the launch behavior every time the SDK starts inside your game client; then Discord can start the game for that player when they open an invite and the game is not already running. Choose one of these registration paths based on your distribution model:
- Register a command that launches your game
- Register a Steam Game ID

<a id="source-registering-a-launch-command-1"></a>

### Registering a Launch Command

 [`Client::RegisterLaunchCommand`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a024d7222931fdcb7d09c2b107642ecab) registers the command Discord should run on this machine to start your game. Call it during SDK startup so Discord can launch the game when the user opens an invite.

```
client->RegisterLaunchCommand(YOUR_APP_ID, "yourgame://");

```

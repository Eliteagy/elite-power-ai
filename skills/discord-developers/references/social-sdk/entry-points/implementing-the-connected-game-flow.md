# Implementing the connected game flow
Context: Discord developer reference: Implementing the connected game flow
[Source](entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](connected-game-prerequisites.md) / [Following source section](connected-game-best-practices.md)
<a id="source-implementing-the-connected-game-flow"></a>

### Implementing the Connected Game Flow

 After adopting SDK version 1.6 or higher, the Client object includes two methods: [`Client::RegisterAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5f34b873e127a446c9ab549e4588ccd7) and [`Client::RemoveAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ab7e48864b0cedf3e8572a228ca401f2a). These methods enable and disable the connected game flow while the game is running. Before invoking [`Client::RegisterAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5f34b873e127a446c9ab549e4588ccd7), call [`Client::SetApplicationId`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ad452335c06b28be0406dab824acccc49) so the game identifies itself to the Discord client and requests are tied to the correct application. Calling [`Client::RegisterAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a5f34b873e127a446c9ab549e4588ccd7) tells the Discord client that the game is running and can begin account linking. Do this as soon as the game can handle an account link, such as after the user signs in or reaches the main menu. When a user selects an account-linking entry point in Discord, the SDK invokes the callback. Treat that event like a click on an in-game account-linking button and begin authorization immediately. Because the user is probably focused on Discord rather than the game, bring attention back to the game client or otherwise notify them. Discord also tells the user to check the game. For the smoothest flow, pull focus back into the game. Calling [`Client::RemoveAuthorizeRequestCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ab7e48864b0cedf3e8572a228ca401f2a) tells Discord the game can no longer start account linking. Call it when the game enters a state where account linking would fail or disrupt play, such as during a match, after logout, or in a full-screen flow like a cutscene. That is sufficient to enable the connected game flow, and you can test or debug it with the [built-in developer tools](https://docs.discord.com/developers/discord-social-sdk/how-to/debug-log#client-tools) in the Discord client.

```
// If you haven't already
client.SetApplicationId("123456789");

client.RegisterAuthorizeRequestCallback([client, myGameAuthorizationHandler]() {
	// Pull focus into your game using native APIs
	// ...

	// Run your normal authorization flow
	myGameAuthorizationHandler.StartDiscordAccountLink();
});

```


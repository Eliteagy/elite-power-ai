# Implementing the web flow
Context: Discord developer reference: Implementing the web flow
[Source](entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](web-flow-prerequisites.md) / [Following source section](overview-next-steps.md)
<a id="source-implementing-the-web-flow"></a>

### Implementing the Web Flow

 Make sure the webpage satisfies these requirements:
- If the user is not signed in to the game account, prompt sign-in and then return them directly to authorization.
- Request the same scopes during authorization that the game requests.
- After authorization, save the token to the user's account the same way in-game authorization would, so it is ready on the next game launch.
- If the user is already in game, send the token update to the client and call [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4) so the user signs in immediately without restarting.

---


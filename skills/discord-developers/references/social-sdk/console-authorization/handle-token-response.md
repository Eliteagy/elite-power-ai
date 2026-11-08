# Handle token response
Context: Discord developer reference: Handle token response
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](exchange-device-code-for-access-token.md) / [Following source section](handle-token-response-example-response.md)
<a id="source-step-5-handle-token-response"></a>

### Step 5: Handle Token Response

 After exchange succeeds, the API returns an access token that can be passed to [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4) and followed with [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa) to start using Discord Social SDK features.

